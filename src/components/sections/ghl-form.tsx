'use client';

import Script from 'next/script';

export function GHLForm() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0f0f0f]">
      <iframe
        src="https://links.deltakilo.com.mx/widget/form/9NXcL6KAWBTRuou966O8"
        style={{ width: '100%', height: '815px', border: 'none', borderRadius: '3px' }}
        id="inline-9NXcL6KAWBTRuou966O8"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="DK CRM principal"
        data-height="815"
        data-layout-iframe-id="inline-9NXcL6KAWBTRuou966O8"
        data-form-id="9NXcL6KAWBTRuou966O8"
        title="DK CRM principal"
      />
      <Script
        src="https://links.deltakilo.com.mx/js/form_embed.js"
        strategy="lazyOnload"
      />
    </div>
  );
}
