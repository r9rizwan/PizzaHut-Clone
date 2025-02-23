import React from "react";
import { FooterLink } from "../ui/footerlink";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="flex flex-col items-start bg-foreground py-8 w-screen ">
      <div className="container max-w-5xl mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h2 className="font-bold text-background  text-lg mb-4">
              About Us
            </h2>
            <ul>
              <FooterLink to="/about-us">About Us</FooterLink>
              <FooterLink to="/pc-game-pass">PC Game Pass</FooterLink>
              <FooterLink to="/dine-in-restaurants">
                Dine-In Restaurants
              </FooterLink>
              <FooterLink to="/recruitment">Recruitment</FooterLink>
              <FooterLink to="/franchise">Franchise</FooterLink>
              <FooterLink to="/property">Property</FooterLink>
              <FooterLink to="/media-press">
                Media and Press Enquiries
              </FooterLink>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="font-bold text-background  text-lg mb-4">
              Help & Service
            </h2>
            <ul>
              <FooterLink to="/contact-us">Contact Us</FooterLink>
              <FooterLink to="/locations">Locations</FooterLink>
              <FooterLink to="/faqs">FAQs & Help</FooterLink>
              <FooterLink to="/opening-hours">Opening Hours</FooterLink>
              <FooterLink to="/hut-phone-numbers">Hut Phone Numbers</FooterLink>
              <FooterLink to="/nutrition-allergens">
                Nutrition & Allergens
              </FooterLink>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="font-bold text-background text-lg mb-4">
              Our Policies
            </h2>
            <ul>
              <FooterLink to="/privacy-policy">Privacy Policies</FooterLink>
              <FooterLink to="/terms-conditions">Terms & Conditions</FooterLink>
              <FooterLink to="/responsible-disclosure">
                Responsible Disclosure
              </FooterLink>
              <FooterLink to="/gender-pay-gap">
                Yum Gender Pay Gap Report
              </FooterLink>
              <FooterLink to="/cookies-ads-policy">
                Cookies and Ads Policy
              </FooterLink>
              <FooterLink to="/tax-strategy">Tax Strategy</FooterLink>
            </ul>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="mt-8 text-center text-sm text-background">
          <p>© 2023 Yum! III (UK) Ltd. All rights reserved.</p>
          <p>
            This site is protected by reCAPTCHA and the Google
            <Link to="/privacy-policy" className="underline mx-1">
              Privacy Policy
            </Link>{" "}
            and
            <Link to="/terms-of-service" className="underline mx-1">
              Terms of Service
            </Link>{" "}
            apply.
          </p>
        </div>
      </div>
    </footer>
  );
};
