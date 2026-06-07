// src/components/blog/BlogList.jsx
// The /blogs index page. Warm, human, scannable. No AI imagery — just calm cards.
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useWellness } from "../../lib/WellnessContext";
import { blogPosts, SITE_URL } from "../../data/blogData";

const PAGE_TITLE = "The LittleHugs Journal — Everyday Wellness for Women";
const PAGE_DESC =
  "Gentle, practical writing for women who hold everything together — the mental load, boundaries, reflection, and small ways to feel steadier.";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

const setMeta = (name, content, attr = "name") => {
  if (typeof document === "undefined") return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const BlogList = () => {
  const { openWellnessFlow } = useWellness();

  // Newest first
  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = posts;

  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESC);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESC, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", `${SITE_URL}/blogs`, "property");

    // Blog schema (helps AI engines understand the collection)
    const ld = {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "The LittleHugs Journal",
      url: `${SITE_URL}/blogs`,
      description: PAGE_DESC,
      blogPost: posts.map((p) => ({
        "@type": "BlogPosting",
        headline: p.title,
        url: `${SITE_URL}/blogs/${p.slug}`,
        datePublished: p.date,
        dateModified: p.updated || p.date,
        description: p.metaDescription,
      })),
    };
    let script = document.getElementById("blog-list-ldjson");
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-list-ldjson";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);

    return () => {
      const s = document.getElementById("blog-list-ldjson");
      if (s) s.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="bg-[#f8f9fb] min-h-screen font-quicksand text-[#4A4B4F]">
      {/* Header */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16 pb-8 text-center">
        <p className="uppercase tracking-[0.18em] text-xs font-semibold text-[#4F7DDD] mb-3">
          The LittleHugs Journal
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2b2d31] leading-tight">
          For the woman who holds it all together
        </h1>
        <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-[#5b5d63]">
          Honest, gentle writing about the mental load, boundaries, reflection and the small
          things that help you feel a little steadier. No lectures. No pressure.
        </p>
      </section>

      {/* Featured */}
      {featured && (
        <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-4">
          <Link
            to={`/blogs/${featured.slug}`}
            className="group block rounded-2xl bg-white border border-[#e9edf4] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6 sm:p-9">
              <div className="flex items-center gap-3 text-xs text-[#8a8d94] mb-3">
                <span className="inline-block rounded-full bg-[#eaf0fb] text-[#4F7DDD] font-semibold px-3 py-1">
                  {featured.category}
                </span>
                <span>{featured.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featured.date)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2b2d31] leading-snug group-hover:text-[#4F7DDD] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-[#5b5d63] text-base sm:text-lg max-w-3xl">{featured.excerpt}</p>
              <span className="inline-block mt-5 text-[#4F7DDD] font-semibold">Read →</span>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rest.map((post) => (
          <Link
            key={post.slug}
            to={`/blogs/${post.slug}`}
            className="group flex flex-col rounded-2xl bg-white border border-[#e9edf4] shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <span className="inline-block self-start rounded-full bg-[#eaf0fb] text-[#4F7DDD] text-xs font-semibold px-3 py-1 mb-3">
              {post.category}
            </span>
            <h3 className="text-lg font-bold text-[#2b2d31] leading-snug group-hover:text-[#4F7DDD] transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-[#5b5d63] flex-grow">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#8a8d94]">
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Reflection CTA band */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-10">
        <div className="rounded-2xl bg-gradient-to-br from-[#4F7DDD] to-[#3a63bd] text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Five minutes that are just yours</h2>
          <p className="mt-3 text-white/90 max-w-2xl mx-auto">
            You spend all day asking how everyone else is doing. LittleHugs is a private daily
            check-in that gently turns the question back to you. No pressure, no advice you didn't
            ask for. Your reflections stay yours.
          </p>
          <button
            onClick={openWellnessFlow}
            className="mt-6 inline-block bg-white text-[#4F7DDD] font-semibold px-7 py-3 rounded-xl hover:bg-[#f1f4fb] transition-colors"
          >
            Start my reflection
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
