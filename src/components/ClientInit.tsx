"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { applyHeaderFooterCssVars, loadLogoSettings } from "@/lib/logoSettings";
import { applyIntensity, loadIntensity, applyPalette, loadPalette } from "@/lib/liquidGlass";

export function ClientInit() {
  const { i18n } = useTranslation();

  useEffect(() => {
    applyHeaderFooterCssVars(loadLogoSettings());
    applyIntensity(loadIntensity());
    applyPalette(loadPalette());
  }, []);

  useEffect(() => {
    const lang = i18n.resolvedLanguage || i18n.language || "en";
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [i18n.resolvedLanguage, i18n.language]);

  return null;
}
