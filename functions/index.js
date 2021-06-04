const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();
        //${AuctionSystem}*2021

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'marwah.auctionsystem@gmail.com',
        pass: '${AuctionSystem}*2021'
    }
});

exports.verifyAuctionPurchase = functions.pubsub.schedule('every 1 minutes').onRun((context) => {
    admin.database().ref('products').once("value", sn=>{
        sn.forEach(p=>{
            if(p.val().type==="forBidding"){
                let now = new Date().getTime() + 10800000;
                console.log("now: ", now, "pend", p.val().totalEndTime)
                if(now > p.val().totalEndTime){
                    if(p.val().lastAt && !p.val().purchased){
                        admin.database().ref(`products/${p.val().id}/purchased`).set(true);
                        let uid = p.val().lastAt.bidder.id;
                        let email = p.val().lastAt.bidder.email;
                        let newd = new Date();
                        let notifId = "notif__" + Math.floor(Math.random()*Date.now());
                        admin.database().ref(`users/${uid}/notifications/${notifId}`).set({
                            id:notifId,
                            date:`${newd.getFullYear()}-${newd.getMonth()-1}-${newd.getDate()}`,
                            message:`You have won the bidding at the auction of the product ${p.val().name} at $${p.val().lastAt.value}, an email will reach you shortly and $${p.val().lastAt.value} will be deducted from your account`
                        })

                        //Send email
                        const mailOptions = {
                            from: 'Marwah Nabulsi - Online Auction System <anasnabulsi.an@gmail.com>',
                            to: email,
                            subject: 'You have won the auction', // email subject
                            html: `<p style="font-size: 16px;">Congratulations</p>
                                <br />
                                <p>You have won the auction of the product <b>${p.val().name}</b> on ${p.val().endDate} - ${p.val().endTime}</p>
                                <br/>
                                <p>The auction ended at value <b>$${p.val().lastAt.value}</b>, and this amount will be deducted from your card soon according to our auction policy</p>
                                <br/>
                                <p>Thank you for your interest in our auction system</p>
                                <p>Regards</p>
                            ` // email content in HTML
                        };

                        transporter.sendMail(mailOptions, (erro, info) => {
                            if(erro){
                                return console.log(erro.toString());
                            }
                        });
                    }
                }
            }
        })
    })
    return null;
  });
