const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const authMiddleware = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const Match = require("../models/Match");

const router = express.Router();

// ✅ Create Stripe Checkout Session
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { matchId, seatType, seats, totalPrice } = req.body;

        // 🔹 Validate inputs
        if (!matchId || !seatType || !seats || !totalPrice) {
            return res.status(400).json({ error: "Missing required booking details" });
        }

        // 🔹 Find match details
        const match = await Match.findById(matchId).populate("venue teamA teamB");
        if (!match) return res.status(404).json({ error: "Match not found" });

        // 🔹 Create a new Booking before payment
        const newBooking = new Booking({
            user: req.user.id,
            match: matchId,
            venue: match.venue._id, // ✅ Ensure venue is populated
            teams: [match.teamA._id, match.teamB._id], // ✅ Ensure teams are added
            seatType,
            seats,
            totalPrice,
            status: "confirmed", 
        });

        await newBooking.save();

        console.log(`✅ Creating checkout for Booking ID: ${newBooking._id}`);

        // 🔹 Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer_email: req.user.email,
            billing_address_collection: "required",
            shipping_address_collection: { allowed_countries: ["IN"] },

            line_items: [{
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: `Match Ticket - ${seatType.toUpperCase()}`,
                        description: `Seats: ${seats}, Total Price: ₹${totalPrice}`,
                    },
                    unit_amount: totalPrice * 100, // Convert INR to paisa
                },
                quantity: seats,
            }],

            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/success?bookingId=${newBooking._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel?bookingId=${newBooking._id}`,
            
            metadata: { 
                bookingId: newBooking._id.toString(), 
                userId: req.user.id 
            }  // ✅ Ensure metadata is correctly stored
        });

        console.log(`✅ Checkout session created: ${session.id}`);
        res.json({ checkoutUrl: session.url });

    } catch (error) {
        console.error("❌ Checkout Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// ✅ Stripe Webhook for Payment Status Updates
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            req.headers["stripe-signature"],
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("❌ Webhook Error:", error.message);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

    try {
        const session = event.data.object;

        if (!session.metadata || !session.metadata.bookingId) {
            console.error("❌ Booking ID is missing in metadata.");
            return res.status(400).json({ error: "Booking ID missing in metadata" });
        }

        const bookingId = session.metadata.bookingId;
        console.log(`✅ Webhook received for Booking ID: ${bookingId}`);

        if (event.type === "checkout.session.completed") {
            // ✅ Update Booking Status to "confirmed"
            await Booking.findByIdAndUpdate(bookingId, { status: "confirmed" }, { new: true });
            console.log(`✅ Booking ${bookingId} confirmed`);
        } else if (event.type === "checkout.session.expired" || event.type === "checkout.session.async_payment_failed") {
            // ❌ Update Booking Status to "failed"
            await Booking.findByIdAndUpdate(bookingId, { status: "failed" }, { new: true });
            console.log(`❌ Booking ${bookingId} failed`);
        }

        res.json({ received: true });

    } catch (error) {
        console.error("❌ Webhook Processing Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
