//Seed files objects for a user storing outfits in an express api - this is a sample for SubTracked
var users = [
  {
    name: "Nina Mutty",
    email: "nina@me.com",
    username: "nmutty",
    password: 'password',
    subscriptions: [
      {
        name: "Netflix",
        cost: 1000,
        nextBillingDate: new Date("Feb 1, 2017"),
        notificationDate: new Date("Jan 30, 2017"),
        firstBillDate: new Date("Feb 1, 2014"),
        billingCycle: "Monthly",
        daysBeforeBilling: 2,
        trialSubscription: false,
        category: "Video Streaming",
        userRating: 4.5,
      },
      {
        name: "Spotify",
        cost: 1000,
        nextBillingDate: new Date("Feb 1, 2017"),
        notificationDate: new Date("Jan 30, 2017"),
        firstBillDate: new Date("May 1, 2015"),
        billingCycle: "Monthly",
        daysBeforeBilling: 2,
        category: "Music Streaming",
        userRating: 4.5,
      }],
    trials: [
      {
        name: "DropBox",
        cost: 1000,
        nextBillingDate: new Date("Feb 1, 2017"),
        notificationDate: new Date("Jan 30, 2017"),
        firstBillDate: new Date("Feb 1, 2017"),
        billingCycle: "Monthly",
        daysBeforeBilling: 2,
        category: "Cloud Storage",
        userRating: null,
      }
    ]
  }, {
    name: "Sam Mutty",
    email: "sam@me.com",
    username: 'sam',
    password: 'password',
    subscriptions: [
      {
        name: "Netflix",
        cost: 1000,
        nextBillingDate: new Date("Feb 1, 2017"),
        notificationDate: new Date("Jan 30, 2017"),
        firstBillDate: new Date("Feb 1, 2014"),
        billingCycle: "Monthly",
        daysBeforeBilling: 2,
        category: "Video Streaming",
        userRating: 4.5,
      }
    ],
    trials: []
  }, {
    name: "Buck Mutty",
    email: "buck@me.com",
    username: 'buck',
    password: 'password',
    subscriptions: [],
    trials: []
  }
];
