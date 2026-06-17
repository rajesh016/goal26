import React from 'react';

const site = { maxWidth: 800, margin: '0 auto', padding: '40px 16px' };

export default function PrivacyPage() {
  return (
    <div style={site}>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: '#F0F4FF', letterSpacing: 2, marginBottom: 8 }}>
        Privacy <span style={{ color: '#FFB800' }}>Policy</span>
      </div>
      <div style={{ fontSize: 12, color: '#8892A4', marginBottom: 32 }}>Last updated: June 2026</div>

      {[
        {
          title: '1. Introduction',
          body: 'Welcome to GOAL26 ("we", "our", or "us"). This Privacy Policy explains how we collect, use, and protect your information when you visit goal26-delta.vercel.app. By using our website, you agree to the terms of this Privacy Policy.'
        },
        {
          title: '2. Information We Collect',
          body: 'We do not collect any personally identifiable information directly. However, third-party services we use (such as Google AdSense and Google Analytics) may automatically collect certain data including: IP address, browser type, pages visited, time spent on pages, and general geographic location.'
        },
        {
          title: '3. Google AdSense & Cookies',
          body: 'We use Google AdSense to display advertisements on our website. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites. You may opt out of personalized advertising by visiting Google\'s Ads Settings at https://adssettings.google.com. Google\'s use of advertising cookies enables it and its partners to serve ads based on your visit to our site. For more information, visit https://policies.google.com/technologies/ads.'
        },
        {
          title: '4. Third-Party Links',
          body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites. We encourage you to read their privacy policies.'
        },
        {
          title: '5. Data Security',
          body: 'We take reasonable measures to protect the information on our website. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.'
        },
        {
          title: '6. Children\'s Privacy',
          body: 'Our website is not directed to children under 13 years of age. We do not knowingly collect personal information from children under 13.'
        },
        {
          title: '7. Disclaimer',
          body: 'GOAL26 is an independent sports information website. We are not affiliated with, endorsed by, or connected to FIFA, any football federation, club, or official World Cup organization. All match data is provided for entertainment and informational purposes only.'
        },
        {
          title: '8. Changes to This Policy',
          body: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. Changes are effective immediately upon posting.'
        },
        {
          title: '9. Contact Us',
          body: 'If you have any questions about this Privacy Policy, please contact us at: goal26fc@gmail.com'
        },
      ].map(({ title, body }) => (
        <div key={title} style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: '#FFB800', marginBottom: 8 }}>{title}</div>
          <div style={{ fontSize: 14, color: '#CBD5E1', lineHeight: 1.8 }}>{body}</div>
        </div>
      ))}
    </div>
  );
}
