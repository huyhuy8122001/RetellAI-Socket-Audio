# retellai-audio-socket

This is a [jambonz](https://jambonz.org) [application](https://www.jambonz.org/docs/webhooks/overview/) that allows Retell AI users to connect their agents to any SIP trunking provider or PBX.

For those of you not familiar with jambonz, it is an open source (MIT-licensed) voice gateway for CPaaS, CX/AI, and Voice/AI which is the functional equivalent of Twilio with the added ability to self-host on your own infrastructure (or use our cloud at [jambonz.cloud](https://jambonz.cloud)).  Jambonz lets you bring your own carrier (BYOC) and use features like bidirectional streaming at no additional cost.  Jambonz integrates with literally hundreds of SIP trunk providers, PBXs, and session border controllers.  It is used in large-scale production deployments by some of the largest CX/AI and Communication Service Providers.

## Overview

This application makes use of the Retell AI [audio websocket](https://docs.retellai.com/api-references/audio-websocket) API.  As of this writing (July 2024) that API has been marked as deprecated; however there is as yet no replacement for it and Retell AI folks have indicated it will be around for a while.

This is intended to be a sample application that you can start with and later extend. It currently supports these features

- inbound calls are connected to your Retell AI agent
- bidirectional streaming is established between your SIP provider and Retell AI
- audio barge-in is enabled through handling the 'clear' message from Retell AI
- call transfer can be enabled by creating a simple tool on Retell AI (see [full blog post](https://blog.jambonz.org/using-jambonz-for-telephony-integration-with-retell-ai) or [video](https://www.youtube.com/watch?v=WQSDqXU1_Cc) for details)
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

For more details, refer to the [blog post](https://blog.jambonz.org/using-jambonz-for-telephony-integration-with-retell-ai) I mentioned above.

## I have more questions!
Join our Slack channel by going to https://joinslack/jambonz.org.
