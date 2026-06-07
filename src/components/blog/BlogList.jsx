// src/components/blog/BlogList.jsx
// The /blogs index — styled to the official LittleHugs Brand Guidelines:
// Inter typeface; Horizon purple #7476E3 / Oceanic #696BDE; Stone #313847 text;
// Light Grey #F1F1F1 background; Accent yellow #FDBB2E; blue→purple gradient panels.
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

  const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const [featured, ...rest] = posts;

  useEffect(() => {
    document.title = PAGE_TITLE;
    setMeta("description", PAGE_DESC);
    setMeta("og:title", PAGE_TITLE, "property");
    setMeta("og:description", PAGE_DESC, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:url", `${SITE_URL}/blogs`, "property");

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
    <main className="bg-[#F1F1F1] min-h-screen font-inter text-[#313847]">
      {/* Breadcrumb (left-aligned) */}
      <div className="max-w-5xl mx-auto px-5 sm:px-6 pt-6">
        <nav aria-label="Breadcrumb" className="text-left text-sm text-[#313847]/60">
          <Link to="/" className="hover:text-[#7476E3]">Home</Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <span className="text-[#313847]">Journal</span>
        </nav>
      </div>

      {/* Header */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pt-6 sm:pt-8 pb-8 text-center">
        <p className="uppercase tracking-[0.18em] text-xs font-semibold text-[#7476E3] mb-3">
          The LittleHugs Journal
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#313847] leading-tight">
          For the woman who holds it all together
        </h1>
        <p className="mt-4 text-base sm:text-lg max-w-2xl mx-auto text-[#313847]/80">
          Honest, gentle writing about the mental load, boundaries, reflection and the small
          things that help you feel a little steadier. No lectures. No pressure.
        </p>
      </section>

      {/* Featured */}
      {featured && (
        <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-4">
          <Link
            to={`/blogs/${featured.slug}`}
            className="group block rounded-3xl bg-white border border-[#E4E4F2] shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6 sm:p-9">
              <div className="flex items-center gap-3 text-xs text-[#313847]/55 mb-3">
                <span className="inline-block rounded-full bg-[#ECECFB] text-[#5557C9] font-semibold px-3 py-1">
                  {featured.category}
                </span>
                <span>{featured.readTime}</span>
                <span aria-hidden="true">·</span>
                <span>{formatDate(featured.date)}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#313847] leading-snug group-hover:text-[#7476E3] transition-colors">
                {featured.title}
              </h2>
              <p className="mt-3 text-[#313847]/80 text-base sm:text-lg max-w-3xl">{featured.excerpt}</p>
              <span className="inline-block mt-5 text-[#7476E3] font-semibold">Read →</span>
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
            className="group flex flex-col rounded-3xl bg-white border border-[#E4E4F2] shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <span className="inline-block self-start rounded-full bg-[#ECECFB] text-[#5557C9] text-xs font-semibold px-3 py-1 mb-3">
              {post.category}
            </span>
            <h3 className="text-lg font-bold text-[#313847] leading-snug group-hover:text-[#7476E3] transition-colors">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-[#313847]/75 flex-grow">{post.excerpt}</p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#313847]/55">
              <span>{post.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{formatDate(post.date)}</span>
            </div>
          </Link>
        ))}
      </section>

      {/* Reflection CTA band — brand blue→purple gradient */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-[#3F41C4] to-[#7476E3] text-white p-8 sm:p-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Five minutes that are just yours</h2>
          <p className="mt-3 text-white/85 max-w-2xl mx-auto">
            You spend all day asking how everyone else is doing. LittleHugs is a private daily
            check-in that gently turns the question back to you. No pressure, no advice you didn't
            ask for. Your reflections stay yours.
          </p>
          <button
            onClick={openWellnessFlow}
            className="mt-6 inline-block bg-white text-[#3F41C4] font-semibold px-7 py-3 rounded-full hover:bg-[#F4F4FE] transition-colors"
          >
            Start My Reflection
          </button>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
