"use client"

import Link from "next/link"
import Image from "next/image"
import { Globe, ShieldCheck, Mail, MapPin, Facebook, Instagram, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/10 pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg overflow-hidden shadow-md shadow-amber-500/10">
                <Image src="/dmc-logo.png" alt="DMC Logo" width={40} height={40} className="object-cover" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Dhanmatrixcapital
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Data-driven investment solutions for the modern Indian retail investor. Smart, secure, and transparent wealth building.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Facebook size={18} />, href: "https://www.facebook.com/share/1BmKYbks6S/", color: "hover:bg-blue-600" },
                { icon: <Instagram size={18} />, href: "https://www.instagram.com/dhanmatrixcapital?igsh=MTNldm91OWw0ZHo3Yw==&utm_source=ig_contact_invite", color: "hover:bg-pink-600" },
                { icon: <MessageCircle size={18} />, href: "https://wa.me/message/XE45RTHTELRAB1", color: "hover:bg-emerald-500" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-slate-200 dark:bg-white/5 flex items-center justify-center ${social.color} dark:${social.color} transition-all cursor-pointer group hover:scale-110 shadow-sm`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/plans" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Investment Plans</Link></li>
              <li><Link href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Support</h4>
            <ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-4 font-medium text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>Solapur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>dhanmatrixcap@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                <span>ISO 27001 Certified</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-white/10 block">
          <div className="bg-slate-100 dark:bg-white/5 p-6 rounded-2xl mb-8">
            <h5 className="font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <ShieldCheck size={14} className="text-amber-500" />
              Market Risk Disclaimer
            </h5>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed font-medium capitalize">
              Investment in the securities market are subject to market risks, read all the related documents carefully before investing. The information provided is for educational and illustrative purposes only and does not constitute investment advice. Past performance is not indicative of future results. The analytics and strategic insights provided by Dhanmatrixcapital are tools to assist investors and do not guarantee specific returns.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <p>&copy; 2025 Dhanmatrixcapital Platform Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/cookies" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
