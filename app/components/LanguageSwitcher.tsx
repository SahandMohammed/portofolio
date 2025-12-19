"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex bg-white/5 rounded-full p-1 border border-white/10 ml-2">
      <button
        onClick={() => switchLocale("en")}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
          locale === "en"
            ? "bg-primary text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("ckb")}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
          locale === "ckb"
            ? "bg-primary text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        KU
      </button>
    </div>
  );
}
