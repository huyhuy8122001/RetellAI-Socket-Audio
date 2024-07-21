# retellai-audio-socket

This is a [jambonz](https://jambonz.org) [application](https://www.jambonz.org/docs/webhooks/overview/) that allows Retell AI users to connect their agents to any BYOC SIP trunking provider. 

For those of you not familiar with jambonz, it is an open source (MIT-licensed) voice gateway for CPaaS, CX/AI, and Voice/AI which is the functional equivalent of Twilio with the added ability to self-host on your own infrastructure (or use our cloud at https://jambonz.cloud), and the ability to bring your own carrier (BYOC) at no added cost.  

If you've been using Twilio and want to save some money..try jambonz!

## Overview

This application makes use of the Retell AI [audio websocket](https://docs.retellai.com/api-references/audio-websocket) API.  As of this writing (July 2024) that API has been marked as deprecated; however there is as yet no replacement for it and Retell AI folks have indicated it will be around for a while.

This is a sample application.  It can certainly be taken and used with no code changes (some configuration will be needed of course, with your Retell AI api key and such), but it is meant to scaffold a basic integration with jambonz and your chosen SIP trunking provider, which you may want to extend and expand on to build more advanced features.  Having said that, it currently supports these features

- inbound calls are connected to your Retell AI agent
- bidirectional streaming is established between your SIP provider and Retell AI
- audio barge-in is enabled through handling the 'clear' message from Retell AI
- call transfer can be enabled by creating a simple tool on Retell AI (see [full blog post]() for details)
- call transfer is supported via either SIP REFER or INVITE

## Installing

Having checked out this repo, do the usual:
```bash
npm ci
```

## Configuring

Edit the [./ecosystem.config.js file](./ecosystem.config.js) and fill in the environment variables where indicated.  Basically, you need to specify your Retell AI api keuy and agent id, and the details of your jambonz environment.

## I'm new to jambonz and I need more help!

Got you covered.  Easiest way to get started is to [create a free trial account on jambonz.cloud](https://jambonz.cloud/register).  Once you have an account, add a Carrier for your chosen SIP trunking provider.  Then add an Application that contains the websocket endpoint that this application exposes.  Add a phone number from your Carrier and connect it to the Application, and you are set to go.

For more details, refer to the [blog post]() I mentioned above.

Questions?  Join our Slack channel byt going to https://joinslack/jambonz.org.

Enjoy!