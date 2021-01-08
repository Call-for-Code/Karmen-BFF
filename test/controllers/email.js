const should = require('should');
const request = require('supertest');
const server = require('../../app');

const timeout = 10000; // in milliseconds
// const long_timeout = 30000; // in miliseconds

describe('controllers', function() {

    describe('email', function() {

        describe('POST /analyzeEmail', function() {

            it('should return a default string', function(done) {
                const text = "sdfghjkl;";
                request(server)
                    .post('/analyzeEmail')
                    .send({ text: text })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        console.log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');

                        done();
                    });
            }).timeout(timeout);

            it('should return a default string', function(done) {
                // let text = "---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:57 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <isitspamibm@gmail.com>\n\n\nisitspamibm@gmail.com\n\n---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:54 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <isitspamibm@gmail.com>\n\n\n\n\n---------- Forwarded message ---------\nFrom: Steve McKay <sdmckay1@gmail.com>\nDate: Sat, Apr 25, 2020 at 4:52 PM\nSubject: Fwd: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <itisspamibm@gmail.com>\n\n\n\n\n---------- Forwarded message ---------\nFrom: Oʀᴅᴇʀ Cᴏɴғɪʀᴍᴀᴛɪᴏɴ <nooreply@vw5.onehabitchanges.com>\nDate: Thu, Apr 23, 2020 at 3:10 AM\nSubject: ᕼI Sdmckay , 𝐖𝐞 𝐇𝐚𝐯𝐞 𝐃𝐨𝐥𝐥𝐚𝐫 𝐆𝐞𝐧𝐞𝐫𝐚𝐥\n𝐖𝐢𝐧𝐧𝐞𝐫𝐬...\nTo: <sdmckay1@gmail.com>\n\n\nDollar General\nSdmckay, 𝑃𝑙𝑒𝑎𝑠𝑒 𝐶𝑜𝑛𝑓𝑖𝑟𝑚 𝑌𝑜𝑢𝑟 $𝟣𝟢𝟢 𝐷𝑜𝑙𝑙𝑎𝑟\n𝐺𝑒𝑛𝑒𝑟𝑎𝑙 𝐺𝑖𝑓𝑡 𝐶𝑎𝑟𝑑 !\n*Click Here*\n<https://t.co/OL14HCgLEi?amp=1>\n\n\n\nThe advertiser does not manage your subscription.\nIf you prefer not to receive further communication please unsubscribe here\n<https://t.co/yWp8Nx7r4E?amp=1>\nOr write to: 11310 E 21st St N ,#518, Wichita, KS, 67206\n";
                // let text = "<p>Sent from my iPhone</p><p>Begin forwarded message:</p><p>&gt; From: &quot;<a href=\"http://1ink.com\">1ink.com</a>&quot; &lt;<a href=\"mailto:info@mortgage-assisting.com\">info@mortgage-assisting.com</a>&gt;<br/>&gt; Date: June 16, 2020 at 7:02:26 PM CDT<br/>&gt; To: <a href=\"mailto:sdmckay1@gmail.com\">sdmckay1@gmail.com</a><br/>&gt; Subject: Never Pay Full Price for Printer Ink Again! Save with us Today.<br/>&gt; Reply-To: <a href=\"mailto:info@mortgage-assisting.com\">info@mortgage-assisting.com</a><br/>&gt;<br/>&gt; &#xFEFF;<br/>&gt; ......Your Source for Printer Ink at a Discount!......<br/>&gt;<br/>&gt; Images not loading? Click Here<br/>&gt;<br/>&gt; This is an ad-supported newsletter. You are receiving this because you signed up for our daily newsletter. Click here to unsubscribe<br/>&gt;<br/>&gt;<br/>&gt; App Portal | PO Box 687 PMB 23797 | Salt Lake City, UT 84110 | United States</p>";
                // let text = "Subject: Fwd: MyChart Activation Link Begin forwarded message:Subject: MyChart Activation LinkTo: . New notification from MyChart! Dear Georgia Prassinos, We invite you to sign up for MyChart, our free, secure online patient portal that allows you to securely communicate with your Inova healthcare team. MyChart also gives you access to your medical information, including upcoming appointments, prescription refill requests, test results, after-visit summaries and more. To learn more about MyChart, visit our website Please follow the instructions below to activate your account: 1.Click the following link: Signup for MyChart! 2. Enter your Date of Birth (mm/dd/yyyy) 3. Create a MyChart Username. This will be your MyChart login ID and cannot be changed, so think of one that is secure and easy to remember. 4. Create a MyChart password. You can change your password at any time. 5. Enter a Password Reset Question and Answer. This can be used at a later time if you forget your password. 6. Select your communication";
                // let text = "Subject: Fwd: [Updated version] Greek skies are open again! Sent from iPhone Begin forwarded message:Subject: [Updated version] Greek skies are open again! Reply-To: Aegean Airlines We are ready to welcome you back! All of us at AEGEAN try to serve you in the best possible way every day, having your health and safety as a priority. Since the beginning of the Covid-19 pandemic, we have been continuously adapting our flight schedule according to the restrictions imposed by the competent authorities that monitor the epidemiological data. Today, as travel within Europe opens up and restrictions are being loosened, we are excited to be finally able to expand our network and connect again Greece to Europe and Europe to Greece. Therefore, as of June 15th, we start to bring back international destinations and will continue to gradually increase your travel choices the coming days, as to travel you again to your favorite places. At this new start of ours, we must together ensure that travel remains safe. So,";
                // let text = "Subject: Fwd: Your DoorDash password changed Sent from iPhone Begin forwarded message:Subject: Your DoorDash password changed Reply-To: no-reply@doordash.com Your password has been changed Hi Georgia, Your DoorDash password was changed. If you initiated this change, you can safely disregard this email. If you didn\'\'t do this, please contact us by submitting a request here as soon as possible, since your account might be at risk. Get the app for Android or iPhone Let\'\'s connect © 2020 DoorDash, Inc. South Tower, Ste. 800, 303 2nd St., San Francisco, CA 94107 Privacy Policy DoorDash Support Become a Dasher Unsubscribe View email in";
                // let text = "Subject: Fwd: You\'\'re due for service at Hogan & Sons Inc.! Sent from iPhone Begin forwarded message:Subject: You\'\'re due for service at Hogan & Sons";
                // let text = "Subject: Fwd: Never Pay Full Price for Printer Ink Again! Save with us Today. Sent from my iPhone Begin forwarded message: >>> To: sdmckay1@gmail.com > Subject: Never Pay Full Price for Printer Ink Again! Save with us Today. > Reply-To: info@mortgage-assisting.com > > > ......Your Source for Printer Ink at a Discount!...... > > Images not loading? Click Here > > This is an ad-supported newsletter. You are receiving this because you signed up for our daily newsletter. Click here to unsubscribe > > > App Portal PO Box 687 PMB 23797 Salt Lake City, UT 84110 United";
                // let text = "Subject: Fwd: Daily Newsletter: How Forbearances Made Mortgages More Expensive Despite All-Time Low Rates---------- Forwarded message ---------Despite All-Time Low Rates To: View this Report in your Web Browser  Forward to a Friend  Subscribe 30 Year Fixed 2.97% -0.03 15 Year Fixed 2.62% +0.00 10YR Treasury 0.69% +0.0066 FNMA 30YR 3.5 105.09 0.00 FNMA 15YR 2.5 105.08 +0.05 View Today's Rates Thursday June 25, 2020 Mortgage Rate Watch - 4:13PM Mortgage Rates Reflecting Market Concerns Mortgage rates moved modestly lower today, bringing the average lender very close to all-time lows . The caveat continues to be that day-to-day rate changes have been small ever since ... MND NewsWire - 2:03PM Forbearance is Major Cause of Lender Overlays In his analysis of current mortgage credit tightening for the Joint Center on Housing Studies excerpted here earlier, Don Layton included a special section on lender overlays . The ... MBS Commentary - 2:50PM MBS RECAP: Lots of Indecision, But The Outcome Should Make Sense Lots  http://www.mortgagenewsdaily.com/reports/newsletter/2020/6/25/4345 http://www.mortgagenewsdaily.com/reports/newsletter/2020/6/25/4345#/share/email http://www.mortgagenewsdaily.com/subscribe http://www.mortgagenewsdaily.com/ http://www.mortgagenewsdaily.com/mortgage_rates/ https://ad.doubleclick.net/ddm/trackclk/N6103.284169MORTGAGENEWSDAILY.CO/B24206313.275758521 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948079 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948043 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948070 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948021 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948016 http://www.mortgagenewsdaily.com/video http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948061 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948022 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948017 http://www.mortgagenewsdaily.com/aroundtheweb http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948077www.redfin.com http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948054 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948053 www.realtor.com http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948038 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948034 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948031 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948014 http://www.mortgagenewsdaily.com/postbyid.aspx?PostId=948007 http://www.mortgagenewsdaily.com/mortgage_rates/about/ http://www.mortgagenewsdaily.com/mbs/ http://www.thomsonreuterseikon.com http://www.mbslive.net http://thomsonreuterseikon.com/ http://engine.adzerk.net/s/redirect/12420/6772/7/23623981 http://www.mortgagenewsdaily.com/unsubscribe.aspx?u=89532&t=2&p=newsletter";
                let text = "Subject: Fwd: Daily Newsletter: Forbearances Surge This Week; Mortgage Rates Are Headed Higher (Eventually) > Begin forwarded message: > >> Subject: Daily Newsletter: Forbearances Surge This Week; Mortgage Rates Are Headed Higher (Eventually) >> To: sdmckay1@gmail.com > > View this Report in your Web Browser Forward to a Friend Subscribe > > 30 Year Fixed > 2.96% -0.01 > 15 Year Fixed > 2.68% +0.06 > 10YR Treasury > 0.64% -0.0426 > FNMA 30YR 3.5 > 105.17 +0.08 > FNMA 15YR 2.5 > 105.11 +0.03 > View Today\'s Rates > > Friday June 26, 2020 > Mortgage Rate Watch - 4:44PM > Mortgage Rates Are Headed Higher (Eventually) > The fates of the economy, the housing market, and interest rates remain closely intertwined with coronavirus. The pandemic is clearly responsible for the record-setting drop in economic ... > MND NewsWire - 9:45AM > Surge in Forbearances This Week > After three weeks of declining totals, Black Knight says the number of active COVID-19 forbearance plans shot up over the past week. As of June 23, http://mortgagenewsdaily.com http://ad.doubleclick.net http://realtor.com http://npr.org http://redfin.com http://thomsonreuterseikon.com http://mbslive.net http://engine.adzerk.net";

                request(server)
                    .post('/analyzeEmail')
                    .send({ text: text })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        console.log(JSON.stringify(res.body));
                        // res.body.should.eql('Hello, stranger!');

                        done();
                    });
            }).timeout(timeout);

        });

    });

});