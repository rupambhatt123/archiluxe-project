"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Mail,
  Phone,
  User,
  Layers,
  FileText,
  MessageSquare,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import PageBanner from "@/components/PageBanner";
import siteData from "@/data/websiteData.json";

export default function ContactPage() {
  const common = (siteData as any)?.common;
  const architecture = (siteData as any)?.categories?.Architecture?.sections;
  const pageBanner = architecture?.PageBanner?.variants?.ArchiPageBanner1;
  const contactData = architecture?.Contact?.variants?.ArchiContact1;
  const servicesList = architecture?.Services?.variants?.ArchiServices1?.items;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: servicesList?.[0]?.title,
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      projectType: servicesList?.[0]?.title,
      subject: "",
      message: "",
    });
    setIsSubmitted(false);
  };

  const officeTitle = contactData?.office?.title;
  const officeAddress = contactData?.office?.address || common?.address;
  const emailTitle = contactData?.email?.title;
  const emailAddress = contactData?.email?.email || common?.email;
  const callTitle = contactData?.call?.title;
  const callPhone = contactData?.call?.phone || common?.phone;

  return (
    <main className="min-h-screen bg-[#faf8f5] text-[#14171c] font-sans selection:bg-[#b88344] selection:text-white">
      <PageBanner
        title={contactData?.badge?.replace(/—/g, "").trim()}
        breadcrumbs={[{ label: contactData?.badge?.replace(/—/g, "").trim() }]}
        bgImage={pageBanner?.bgOverlayImage}
      />

      <section className="pt-10 sm:pt-14 pb-12 sm:pb-16 px-4 sm:px-6 md:px-8 max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
                <span className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#b88344]">
                  {contactData?.badge?.replace(/—/g, "").trim()}
                </span>
                <span className="w-7 h-[1.5px] bg-[#b88344]"></span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-[42px] font-black text-[#14171c] leading-[1.14] tracking-tight">
                {contactData?.titleLine1}{" "}
                <span className="text-[#b88344]">
                  {contactData?.titleHighlight}
                </span>
              </h2>

              <p className="text-xs sm:text-[13.5px] text-neutral-600 font-normal leading-relaxed mt-2.5">
                {contactData?.description}
              </p>
            </div>

            <div className="space-y-3.5 pt-1">
              {officeAddress && (
                <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-100 shadow-[0_3px_15px_rgba(0,0,0,0.02)] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#fbf5eb] text-[#b88344] flex items-center justify-center shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    {officeTitle && (
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#14171c]">
                        {officeTitle}
                      </h4>
                    )}
                    <p className="text-[11.5px] sm:text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {officeAddress}
                    </p>
                  </div>
                </div>
              )}

              {emailAddress && (
                <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-100 shadow-[0_3px_15px_rgba(0,0,0,0.02)] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#fbf5eb] text-[#b88344] flex items-center justify-center shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    {emailTitle && (
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#14171c]">
                        {emailTitle}
                      </h4>
                    )}
                    <a
                      href={`mailto:${emailAddress}`}
                      className="text-[11.5px] sm:text-xs text-neutral-500 hover:text-[#b88344] mt-0.5 block truncate transition-colors"
                    >
                      {emailAddress}
                    </a>
                  </div>
                </div>
              )}

              {callPhone && (
                <div className="bg-white rounded-2xl p-4 sm:p-4.5 border border-neutral-100 shadow-[0_3px_15px_rgba(0,0,0,0.02)] flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#fbf5eb] text-[#b88344] flex items-center justify-center shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    {callTitle && (
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#14171c]">
                        {callTitle}
                      </h4>
                    )}
                    <a
                      href={`tel:${callPhone.replace(/[^0-9+]/g, "")}`}
                      className="text-[11.5px] sm:text-xs text-neutral-500 hover:text-[#b88344] mt-0.5 block transition-colors"
                    >
                      {callPhone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-9 border border-neutral-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] w-full">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl sm:text-[26px] font-extrabold text-[#14171c] tracking-tight">
                    {contactData?.form?.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-neutral-500 mt-1">
                    {contactData?.form?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <User size={16} />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder={contactData?.form?.namePlaceholder}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#b88344] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder={contactData?.form?.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#b88344] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Phone size={16} />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder={contactData?.form?.phonePlaceholder}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#b88344] focus:bg-white transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Layers size={16} />
                    </div>
                    <select
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      className="w-full pl-11 pr-10 py-3 sm:py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 appearance-none focus:outline-none focus:border-[#b88344] focus:bg-white transition-all cursor-pointer"
                    >
                      {servicesList?.map((srv: any) => (
                        <option key={srv.slug || srv.title} value={srv.title}>
                          {srv.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-400">
                      <ChevronDown size={15} />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <FileText size={16} />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder={contactData?.form?.subjectPlaceholder}
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#b88344] focus:bg-white transition-all"
                  />
                </div>

                <div className="relative">
                  <div className="absolute top-3.5 left-0 pl-4 pointer-events-none text-neutral-400">
                    <MessageSquare size={16} />
                  </div>
                  <textarea
                    rows={4}
                    required
                    placeholder={contactData?.form?.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-3.5 bg-[#faf8f5] border border-neutral-200/80 rounded-2xl text-xs sm:text-[13px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#b88344] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#b88344] hover:bg-[#a07136] text-white py-3.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#b88344]/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-75"
                >
                  {isSubmitting
                    ? contactData?.form?.submittingLabel
                    : contactData?.form?.submitButton}{" "}
                  <ArrowRight size={15} />
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="py-8 sm:py-12 px-4 text-center flex flex-col items-center justify-center space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#fbf5eb] text-[#b88344] flex items-center justify-center shadow-inner">
                  <CheckCircle2 size={36} className="stroke-[2.2]" />
                </div>

                <div className="space-y-2 max-w-md">
                  <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#b88344]">
                    {contactData?.success?.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#14171c] tracking-tight">
                    {contactData?.success?.heading}, {formData.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                    {contactData?.success?.description
                      ?.replace("{{email}}", formData.email)
                      ?.replace("{{projectType}}", formData.projectType)}
                  </p>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 bg-[#faf8f5] hover:bg-[#f1ede6] text-[#14171c] border border-neutral-200/80 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCcw size={14} />{" "}
                    {contactData?.success?.resetButton}
                  </button>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 bg-[#b88344] hover:bg-[#a07136] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-[#b88344]/25 transition-all"
                  >
                    {contactData?.success?.homeButton}{" "}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {contactData?.mapLocation?.embedUrl && (
        <section className="px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 max-w-[1360px] mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-neutral-100 h-[280px] sm:h-[360px]">
            <iframe
              src={contactData.mapLocation.embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="filter saturate-75 w-full h-full"
              title={contactData.mapLocation.label}
            />

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center max-w-[90%]">
              <div className="bg-white/95 backdrop-blur-md px-4 sm:px-5 py-2 rounded-xl shadow-xl border border-neutral-100 text-center mb-2">
                <h5 className="font-extrabold text-xs text-[#14171c]">
                  {contactData.mapLocation.label}
                </h5>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-0.5 truncate max-w-[240px] sm:max-w-none">
                  {contactData.mapLocation.address}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#b88344] text-white flex items-center justify-center shadow-xl ring-4 ring-white animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}