// src/components/blog/BlogPost.jsx
// A single article at /blogs/:slug. Built for humans first, structured for search and AI engines.
import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWellness } from "../../lib/WellnessContext";
import { blogPosts, blogAuthor, SITE_URL } from "../../data/blogData";

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

const setCanonical = (href) => {
  if (typeof document === "undefined") return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

// Renders one content block. Headings are phrased like real questions so they
// match how people search — and they double as the article's structure.
const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl font-bold text-[#2b2d31] mt-10 mb-3 leading-snug">{block.text}</h2>;
    case "h3":
      return <h3 className="text-xl font-bold text-[#2b2d31] mt-7 mb-2">{block.text}</h3>;
    case "p":
      return <p className="text-[#454751] leading-relaxed mb-4 text-[1.05rem]">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-[#454751] text-[1.05rem]">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-[#454751] text-[1.05rem]">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed pl-1">{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#4F7DDD] pl-5 my-6 text-lg italic text-[#3a3c42]">
          {block.text}
        </blockquote>
      );
    case "callout":
      return null; // callouts are rendered separately so we can attach the CTA button
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const { openWellnessFlow } = useWellness();
  const post = blogPosts.find((p) => p.slug === slug);

  useEffect(() => {
    if (!post) {
      document.title = "Article not found — LittleHugs";
      return;
    }
    const url = `${SITE_URL}/blogs/${post.slug}`;
    document.title = `${post.metaTitle || post.title} | LittleHugs`;
    setMeta("description", post.metaDescription);
    setMeta("keywords", (post.keywords || []).join(", "));
    setMeta("author", blogAuthor.name);
    setCanonical(url);
    setMeta("og:title", post.metaTitle || post.title, "property");
    setMeta("og:description", post.metaDescription, "property");
    setMeta("og:type", "article", "property");
    setMeta("og:url", url, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", post.metaTitle || post.title);
    setMeta("twitter:description", post.metaDescription);

    // BlogPosting + FAQPage structured data (citable by AI engines, eligible for rich results)
    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        author: { "@type": "Organization", name: blogAuthor.name, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "LittleHugs",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.svg` },
        },
        datePublished: post.date,
        dateModified: post.updated || post.date,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        keywords: (post.keywords || []).join(", "),
        articleSection: post.category,
        inLanguage: "en-GB",
      },
    ];
    if (post.faqs && post.faqs.length) {
      ld.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
    }
    let script = document.getElementById("blog-post-ldjson");
    if (!script) {
      script = document.createElement("script");
      script.id = "blog-post-ldjson";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(ld);

    window.scrollTo(0, 0);
    return () => {
      const s = document.getElementById("blog-post-ldjson");
      if (s) s.remove();
    };
  }, [post]);

  if (!post) {
    return (
      <main className="min-h-screen bg-[#f8f9fb] font-quicksand flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-bold text-[#2b2d31] mb-2">We couldn't find that article</h1>
        <p className="text-[#5b5d63] mb-6">It may have moved, or the link might be slightly off.</p>
        <Link to="/blogs" className="text-[#4F7DDD] font-semibold">← Back to the journal</Link>
      </main>
    );
  }

  const callout = post.content.find((b) => b.type === "callout");
  const related = (post.related || [])
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <main className="bg-[#f8f9fb] min-h-screen font-quicksand text-[#4A4B4F]">
      <article className="max-w-2xl mx-auto px-5 sm:px-6 pt-8 pb-16">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-[#8a8d94] mb-6">
          <Link to="/" className="hover:text-[#4F7DDD]">Home</Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <Link to="/blogs" className="hover:text-[#4F7DDD]">Journal</Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <span className="text-[#5b5d63]">{post.category}</span>
        </nav>

        <span className="inline-block rounded-full bg-[#eaf0fb] text-[#4F7DDD] text-xs font-semibold px-3 py-1 mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#2b2d31] leading-tight">{post.title}</h1>

        {/* Byline + freshness (E-E-A-T signals) */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#8a8d94] mt-4 mb-8">
          <span>By {blogAuthor.name}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Updated {formatDate(post.updated || post.date)}</span>
        </div>

        {/* Body */}
        <div>
          {post.content.map((block, i) =>
            block.type === "callout" ? (
              <div
                key={i}
                className="my-8 rounded-2xl bg-[#eef3fc] border border-[#dbe6fb] p-6 text-center"
              >
                <p className="text-[#33414f] mb-4">{block.text}</p>
                <button
                  onClick={openWellnessFlow}
                  className="inline-block bg-[#4F7DDD] hover:bg-[#3a63bd] text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
                >
                  Start my reflection
                </button>
              </div>
            ) : (
              <Block key={i} block={block} />
            )
          )}
        </div>

        {/* FAQs (visible + structured) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#2b2d31] mb-5">Common questions</h2>
            <div className="space-y-4">
              {post.faqs.map((f, i) => (
                <details key={i} className="rounded-xl bg-white border border-[#e9edf4] p-5">
                  <summary className="font-semibold text-[#2b2d31] cursor-pointer list-none">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-[#5b5d63] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Closing reflection CTA */}
        <section className="mt-12 rounded-2xl bg-gradient-to-br from-[#4F7DDD] to-[#3a63bd] text-white p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold">You hold space for everyone.</h2>
          <p className="mt-2 text-white/90">
            Let LittleHugs hold five minutes for you. A private daily check-in — gentle, and
            entirely yours.
          </p>
          <button
            onClick={openWellnessFlow}
            className="mt-5 inline-block bg-white text-[#4F7DDD] font-semibold px-7 py-3 rounded-xl hover:bg-[#f1f4fb] transition-colors"
          >
            Start my reflection
          </button>
        </section>

        {/* Author note */}
        <p className="mt-10 text-sm text-[#8a8d94] italic">{blogAuthor.bio}</p>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-16">
          <h2 className="text-xl font-bold text-[#2b2d31] mb-5">Keep reading</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blogs/${r.slug}`}
                className="group rounded-xl bg-white border border-[#e9edf4] p-5 hover:shadow-md transition-shadow"
              >
                <span className="text-xs font-semibold text-[#4F7DDD]">{r.category}</span>
                <h3 className="mt-1.5 font-bold text-[#2b2d31] leading-snug group-hover:text-[#4F7DDD] transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;
