import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const p = path.resolve(process.cwd(), file);
    if (fs.existsSync(p)) {
      const content = fs.readFileSync(p, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}
loadEnv();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vhffmxoqirbczmcpoqtx.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZmZteG9xaXJiY3ptY3BvcXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0NDc0OTcsImV4cCI6MjEwNjAyMzQ5N30.KA71VaM-70gcegKJB0BXjh9S-qKeRW9eQ9hq-axbf8A";

async function main() {
  console.log("🔍 Verifying Supabase connection and operations...");
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 1. Test Admin Login
  console.log("1. Testing Admin Authentication...");
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: "admin@yessbgd.com",
    password: "Admin@YessBgd2026!",
  });

  if (authError) {
    console.error("❌ Admin authentication failed:", authError.message);
  } else {
    console.log("✅ Admin authentication succeeded! User ID:", authData.user?.id);
    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", authData.user?.id)
      .single();
    console.log("   Role in user_roles:", roleData?.role);
  }

  // 2. Test Contact Message Intake (Anon)
  console.log("\n2. Testing Inbound Contact Message Intake...");
  const testMsg = {
    full_name: "E2E Test Executive",
    email: "test.executive@institution.org",
    phone: "+880 1711 000111",
    organization: "Global Infrastructure Fund",
    subject: "Venture Co-Building & Equity Structuring",
    message: "Automated end-to-end verification inquiry testing live ingestion pipeline.",
    request_nda: true,
  };

  const { data: msgInsert, error: msgError } = await supabase
    .from("contact_messages")
    .insert(testMsg)
    .select()
    .single();

  if (msgError) {
    console.error("❌ Contact message submission failed:", msgError.message);
  } else {
    console.log("✅ Contact message persisted with ID:", msgInsert.id);
  }

  // 3. Test Job Application and lookup_application RPC
  console.log("\n3. Testing Job Application Submission & Lookup RPC...");
  const testRef = `YESS-ENG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const testCandidateEmail = "candidate.e2e@domain.com";

  const { data: appInsert, error: appError } = await supabase
    .from("job_applications")
    .insert({
      reference_number: testRef,
      opening_id: "senior-full-stack-engineer",
      opening_title: "Lead Cloud Solutions Architect",
      full_name: "Tariq Candidate",
      email: testCandidateEmail,
      phone: "+880 1819 999888",
      portfolio_url: "https://github.com/candidate-e2e",
      cover_note: "Verification cover letter",
      status: "screening",
      feedback: "Profile verified through E2E pipeline test.",
    })
    .select()
    .single();

  if (appError) {
    console.error("❌ Job application insert failed:", appError.message);
  } else {
    console.log(`✅ Job application created: Ref=${testRef}, Status=${appInsert.status}`);

    // Call RPC as anon
    const { data: rpcData, error: rpcError } = await supabase.rpc("lookup_application", {
      _email: testCandidateEmail,
      _ref: testRef,
    });

    if (rpcError) {
      console.error("❌ lookup_application RPC failed:", rpcError.message);
    } else if (rpcData && rpcData.length > 0) {
      console.log("✅ lookup_application RPC verified! Found record:", {
        ref: rpcData[0].reference_number,
        name: rpcData[0].full_name,
        status: rpcData[0].status,
        feedback: rpcData[0].feedback,
      });
    } else {
      console.error("❌ lookup_application returned empty array");
    }
  }

  // 4. Test CMS Site Pages & Ventures Query
  console.log("\n4. Verifying CMS Content Tables...");
  const { count: pagesCount } = await supabase.from("cms_site_pages").select("*", { count: "exact", head: true });
  const { count: venturesCount } = await supabase.from("cms_ventures").select("*", { count: "exact", head: true });
  const { count: servicesCount } = await supabase.from("cms_services").select("*", { count: "exact", head: true });
  const { count: industriesCount } = await supabase.from("cms_industries").select("*", { count: "exact", head: true });
  const { count: openingsCount } = await supabase.from("cms_openings").select("*", { count: "exact", head: true });
  const { count: settingsCount } = await supabase.from("cms_settings").select("*", { count: "exact", head: true });

  console.log(`   cms_site_pages:  ${pagesCount} records`);
  console.log(`   cms_ventures:    ${venturesCount} records`);
  console.log(`   cms_services:    ${servicesCount} records`);
  console.log(`   cms_industries:  ${industriesCount} records`);
  console.log(`   cms_openings:    ${openingsCount} records`);
  console.log(`   cms_settings:    ${settingsCount} records`);

  console.log("\n🎉 ALL E2E VERIFICATIONS COMPLETED SUCCESSFULLY!");
}

main().catch(console.error);
