export const coc_view_modal = {
  type: "modal" as "modal",
  callback_id: "coc-modal",
  title: {
    type: "plain_text" as "plain_text",
    text: "Tech Tank COC",
    emoji: true,
  },
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "We, the admin team at TechTank, are happy to have grown to such a large group in such a short amount of time. As we value the participation and enjoyment of everyone in our community, we have decided to release community guidelines/codes of conduct. Our goal and wish is that everyone has a positive experience, and these codes apply to ALL community spaces: our slack workspace, in-person and virtual social gatherings, and direct messages. Repeated unacceptable behaviour will lead to expulsion from the group as we are here to create a safe and inclusive space for everyone.",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Enforcement:*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "nstances of abuse, harassment or any unacceptable behavior can be reported to the workspace admins (Chris K., Sammy, Nonso, Niya, Riaz, Neal or Erik O.). We will take corrective action in response to any behavior deemed inappropriate, threatening, offensive or harmful. We have a right to protect this space and individuals within. \n1. Notice of Correction → We will contact said individual to correct their behavior via slack \n2. Temporary Ban → banned from the community for weeks. This includes interaction in community spaces, external channels and direct messages on and off the community. \n3. Permanent Ban",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Unacceptable Behavior:*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "1. **No hate speech or discriminatory language: Do not engage in or tolerate any form of hate speech, including but not limited to racist, sexist, homophobic, transphobic, or ableist language.** \n2. **No discrimination: Treat all individuals with fairness, respect, and dignity, regardless of their race, gender, sexual orientation, religion, nationality, disability, or any other characteristic.** \n3. **No harassment: Do not engage in any form of harassment, including verbal, written, physical, or visual harassment. This includes but is not limited to offensive jokes, derogatory comments, unwelcome advances, or persistent unwelcome communication. This includes asking for referrals from people you have not had contact with prior.**\n4. **No bullying or intimidation: Do not engage in any behavior intended to intimidate, belittle, or demean others within the group.**\n5. **No feigning surprise: Don't act surprised or belittle others when they express not knowing something, whether it's a technical or non-technical topic.**\n6. **No well-actually's: Avoid making minor corrections solely for the purpose of grandstanding, particularly if they don't significantly contribute to the conversation.**\n7. **No back-seat driving (in irl, face-to-face contexts): Refrain from intermittently offering unsolicited advice or interrupting ongoing conversations, as it can be disruptive and disrespectful. Instead, fully engage and participate when helping or joining discussions.**\n8. **Respect other people’s boundaries. No means no.**\n9. **Respect other people’s time. Many folx in the group, including the admins, have personal and professional lives outside of the group. Expect delays in responses especially on weekends and weeknights, and understand it might take time to respond to your query. (*N.B.: If you have a general question that you think might benefit others in the group, always consider posting in an appropriate channel before sending a DM to an admin.*)** \n\n- *Taken from Toronto Javascript*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Examples of Unaccepted Behaviors:*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "- Unsolicited sexual advances \n- Trolling, insulting, derogatory comments\n- Public or private harassment\n- Leaking private information such as email address or physical address\n- Any conduct you would not do in a professional setting",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Acceptable Behaviors:*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "1. *Fostering empathy and kindness. Treating others the way you would want to be treated.*\n2. *Respecting each other’s differing opinions, viewpoints and experiences*\n3. *Giving constructive feedback*\n4. *Focusing on what is not best for us as individuals, but for the overall community*\n5. *Fostering empathy and kindness. Treating others the way you would want to be treated.*\n6. *Most importantly, having fun and creating a safe community*",
      },
    },
    {
      type: "divider",
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "*Referral Policy:*",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "Recognizing the importance of referrals in professional networking, our administrative team has identified the need for explicit guidelines to foster beneficial interactions and maintain the integrity of our organization.",
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: "1. *Referral Request Prudence:* Members should refrain from requesting referrals during their initial interaction with an individual. It's essential to remember that successful referrals depend on a relationship of trust and mutual understanding, which requires more than a single interaction to establish.\n2. *Respect for Professional Reputation:* We must acknowledge that when someone provides a referral, they are staking their professional reputation on the line. Consequently, requesting a referral should not be a casual inquiry but a mindful consideration of the potential implications for the referring party.",
      },
    },
    {
      type: "divider",
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "By adhering to these guidelines, we can maintain a respectful, professional environment that fosters genuine networking and promotes sustainable growth for all members. By accepting our code of conduct, you agree that we reserve the right to limit your access to our slack workspace should we require to take corrective action.",
        },
      ],
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Accept COC",
            emoji: true,
          },
          value: "i_accept_coc",
          action_id: "accept-coc",
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Deny COC",
            emoji: true,
          },
          value: "i_deny_coc",
          action_id: "deny-coc",
        },
      ],
    },
  ],
};
