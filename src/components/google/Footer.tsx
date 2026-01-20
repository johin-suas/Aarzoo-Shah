const Footer = () => {
  return (
    <footer className="bg-muted/30 py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border border-border text-left">
            <h3 className="font-montserrat font-bold text-lg text-accent mb-4">
              DISCLAIMER
            </h3>

            <div className="space-y-4 text-sm text-foreground/70 leading-relaxed">
              <p>
                <strong className="text-foreground">Educational Purpose Only:</strong> This program is for financial literacy education and not
investment advice.
              </p>

              <p>
                <strong className="text-foreground">Age Requirement:</strong> You must be at least 18 years old to participate in any financial education programs or workshops.
              </p>

              <p>
                <strong className="text-foreground">Risk Warning:</strong> All financial instruments involve risk, including potential loss of capital.
              </p>

              <p>
                <strong className="text-foreground">No Guarantees:</strong> We do not promise profits, returns, or outcomes.
              </p>

              <p>
                <strong className="text-foreground">Investment Responsibility:</strong>Participants are responsible for their own financial decisions .
              </p>

              <p>
                <strong className="text-foreground">Professional Consultation:</strong> Always consult qualified financial advisors who understand your specific circumstances before making investment decisions. We are not licensed financial advisors, and no advisor-client relationship is created through this content.
              </p>

              <p>
                <strong className="text-foreground">Recording & Platform Notice:</strong> Sessions may be recorded for quality, training, and promotional purposes. By participating, you consent to recording. This content is not affiliated with or endorsed by Meta™, Google, or other platforms mentioned.
              </p>

              <p>
                <strong className="text-foreground">Third-Party References:</strong> Content may reference third-party resources, tools, or platforms. We are not responsible for third-party content accuracy and do not endorse specific products or services unless explicitly stated.
              </p>

              <p>
                <strong className="text-foreground">Liability Limitation:</strong> You acknowledge trading involves risks and uncertainties. You are solely responsible for investment decisions and financial consequences. We disclaim liability for losses or damages from participation in educational programs.
              </p>

              <p>
                <strong className="text-foreground">Regulatory Compliance:</strong> Financial regulations vary by jurisdiction. Ensure compliance with applicable laws in your location. Content accuracy is maintained according to applicable regulations, but participants must verify current regulatory requirements.
              </p>

              <p>
                <strong className="text-foreground">Terms Agreement:</strong> By accessing this content, you agree to our terms and conditions, privacy policy, and acknowledge understanding of all risks involved in financial markets.
              </p>
            </div>
             <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-xs sm:text-sm text-black/60">
            © {new Date().getFullYear()} Aarzoo Shah. All rights reserved. Powered by Adx Media Advertising LLP
          </p>
          <a href="#top" className="font-poppins text-xs sm:text-sm underline decoration-khaki/50 hover:text-khaki">
            Back to top
          </a>
        </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
