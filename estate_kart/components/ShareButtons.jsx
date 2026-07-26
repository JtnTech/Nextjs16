"use client";

import { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Share2, ChevronDown, ChevronUp } from "lucide-react";

const ShareButtons = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-card border border-slate-200 overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setShowShareOptions(!showShareOptions)}
        className="w-full flex items-center justify-between gap-2 px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors duration-200"
        aria-expanded={showShareOptions}
        aria-controls="share-options"
      >
        <span className="flex items-center gap-2">
          <Share2 size={16} className="text-blue-500" />
          Share this Property
        </span>
        {showShareOptions ? (
          <ChevronUp size={16} className="text-slate-400" />
        ) : (
          <ChevronDown size={16} className="text-slate-400" />
        )}
      </button>

      {/* Share Options Panel */}
      {showShareOptions && (
        <div
          id="share-options"
          className="border-t border-slate-100 px-5 py-4 animate-slide-up"
        >
          <p className="text-xs text-slate-400 mb-3 font-medium">Share via</p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="hover:scale-110 transition-transform duration-200" title="Facebook">
              <FacebookShareButton
                url={shareUrl}
                quote={property.name}
                hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
              >
                <FacebookIcon size={38} round />
              </FacebookShareButton>
            </div>

            <div className="hover:scale-110 transition-transform duration-200" title="Twitter">
              <TwitterShareButton
                url={shareUrl}
                title={property.name}
                hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
              >
                <TwitterIcon size={38} round />
              </TwitterShareButton>
            </div>

            <div className="hover:scale-110 transition-transform duration-200" title="WhatsApp">
              <WhatsappShareButton
                url={shareUrl}
                title={property.name}
                separator=":: "
              >
                <WhatsappIcon size={38} round />
              </WhatsappShareButton>
            </div>

            <div className="hover:scale-110 transition-transform duration-200" title="Email">
              <EmailShareButton
                url={shareUrl}
                subject={property.name}
                body={`Check out this property listing: ${shareUrl}`}
              >
                <EmailIcon size={38} round />
              </EmailShareButton>
            </div>

            {/* Copy link */}
            <div className="relative">
              {copied && (
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg shadow-md whitespace-nowrap animate-fade-in">
                  Copied!
                </div>
              )}
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center w-[38px] h-[38px] rounded-full transition-all duration-200 hover:scale-110 ${
                  copied
                    ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200"
                }`}
                title="Copy link"
                aria-label="Copy property link"
              >
                {copied ? <FaCheck size={14} /> : <FaCopy size={14} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButtons;
