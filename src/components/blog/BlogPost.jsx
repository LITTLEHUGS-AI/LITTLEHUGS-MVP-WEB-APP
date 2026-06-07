// src/components/blog/BlogPost.jsx
// A single article at /blogs/:slug. Built for humans first, structured for search and AI engines.
// Matches the live landing page (Quicksand, cream #FAF3ED, #4A4B4F text, dark-green #1E2C2B pills).
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

const Block = ({ block }) => {
  switch (block.type) {
    case "h2":
      return <h2 className="text-2xl font-semibold text-[#4A4B4F] mt-10 mb-3 leading-snug">{block.text}</h2>;
    case "h3":
      return <h3 className="text-xl font-semibold text-[#4A4B4F] mt-7 mb-2">{block.text}</h3>;
    case "p":
      return <p className="text-[#4A4B4F] leading-relaxed mb-4 text-[1.05rem]">{block.text}</p>;
    case "ul":
      return (
        <ul className="list-disc pl-6 mb-5 space-y-2 text-[#4A4B4F] text-[1.05rem] marker:text-[#1E2C2B]">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal pl-6 mb-5 space-y-2 text-[#4A4B4F] text-[1.05rem] marker:text-[#1E2C2B] marker:font-semibold">
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed pl-1">{it}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-[#1E2C2B] pl-5 my-6 text-lg italic text-[#4A4B4F]">
          {block.text}
        </blockquote>
      );
    case "callout":
      return null;
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
    if (post.image) setMeta("og:image", `${SITE_URL}${post.image}`, "property");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", post.metaTitle || post.title);
    setMeta("twitter:description", post.metaDescription);
    if (post.image) setMeta("twitter:image", `${SITE_URL}${post.image}`);

    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.metaDescription,
        image: post.image ? `${SITE_URL}${post.image}` : undefined,
        author: { "@type": "Organization", name: blogAuthor.name, url: SITE_URL },
        publisher: {
          "@type": "Organization",
          name: "LittleHugs",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/LOGO.svg` },
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
      <main className="min-h-screen bg-[#FAF3ED] font-quicksand flex flex-col items-center justify-center text-center px-6" style={{ fontFamily: "Quicksand, sans-serif" }}>
        <h1 className="text-2xl font-semibold text-[#4A4B4F] mb-2">We couldn't find that article</h1>
        <p className="text-[#6b6c70] mb-6">It may have moved, or the link might be slightly off.</p>
        <Link to="/blogs" className="text-[#1E2C2B] font-semibold">← Back to the Journal</Link>
      </main>
    );
  }

  const related = (post.related || [])
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <main className="bg-[#FAF3ED] min-h-screen font-quicksand text-left text-[#4A4B4F]" style={{ fontFamily: "Quicksand, sans-serif" }}>
      <article className="max-w-3xl mx-auto px-5 sm:px-6 pt-8 pb-16">
        {/* Breadcrumb (left-aligned, sits at the article's left edge) */}
        <nav aria-label="Breadcrumb" className="text-left text-sm text-[#6b6c70] mb-6">
          <Link to="/" className="hover:text-[#1E2C2B]">Home</Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <Link to="/blogs" className="hover:text-[#1E2C2B]">Journal</Link>
          <span className="mx-1.5" aria-hidden="true">/</span>
          <span className="text-[#1E2C2B]">{post.category}</span>
        </nav>

        {/* Hero image */}
        {post.image && (
          <img src={post.image} alt={post.imageAlt || post.title}
            className="w-full h-56 sm:h-72 object-cover rounded-3xl mb-8" loading="eager" />
        )}

        <span className="inline-block rounded-full bg-[#fef8e6] text-[#4A4B4F] text-xs font-semibold px-3 py-1 mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold text-[#4A4B4F] leading-snug">{post.title}</h1>

        {/* Byline + freshness (E-E-A-T signals) */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#6b6c70] mt-4 mb-8">
          <span>By {blogAuthor.name}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
          <span aria-hidden="true">·</span>
          <span>Updated {formatDate(post.updated || post.date)}</span>
        </div>

        {/* Body — constrained for comfortable reading */}
        <div className="max-w-2xl">
          {post.content.map((block, i) =>
            block.type === "callout" ? (
              <div
                key={i}
                className="my-8 rounded-3xl bg-[#fef8e6] border border-[#efe4d8] p-6 text-center"
              >
                <p className="text-[#4A4B4F] mb-4">{block.text}</p>
                <button
                  onClick={openWellnessFlow}
                  className="inline-block bg-[#1E2C2B] hover:bg-[#111818] text-white font-semibold px-6 py-2.5 rounded-full transition"
                >
                  Start My Reflection
                </button>
              </div>
            ) : (
              <Block key={i} block={block} />
            )
          )}
        </div>

        {/* FAQs (visible + structured) */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-12 max-w-2xl">
            <h2 className="text-2xl font-semibold text-[#4A4B4F] mb-5">Common questions</h2>
            <div className="space-y-4">
              {post.faqs.map((f, i) => (
                <details key={i} className="rounded-2xl bg-white border border-[#efe4d8] p-5">
                  <summary className="font-semibold text-[#4A4B4F] cursor-pointer list-none">
                    {f.q}
                  </summary>
                  <p className="mt-3 text-[#4A4B4F]/90 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Further reading (references) */}
        {post.references && post.references.length > 0 && (
          <section className="mt-12 max-w-2xl">
            <h2 className="text-xl font-semibold text-[#4A4B4F] mb-2">Further reading</h2>
            <p className="text-sm text-[#6b6c70] mb-3 italic">
              This is general wellbeing writing, not medical advice. If things feel heavy, these trusted resources can help.
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-[#4A4B4F]">
              {post.references.map((r, i) => (
                <li key={i}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer"
                    className="text-[#1E2C2B] underline underline-offset-2 hover:text-[#111818]">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Closing reflection CTA — landing-page dark panel */}
        <section className="mt-12 rounded-3xl bg-[#1E2C2B] text-white p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-medium">You hold space for everyone.</h2>
          <p className="mt-2 text-white/85">
            Let LittleHugs hold five minutes for you. A private daily check-in — gentle, and
            entirely yours.
          </p>
          <button
            onClick={openWellnessFlow}
            className="mt-5 inline-block bg-white text-[#1E2C2B] font-semibold px-7 py-3 rounded-full hover:bg-[#f3eee6] transition"
          >
            Start My Reflection
          </button>
        </section>

        {/* Author note */}
        <p className="mt-10 text-sm text-[#6b6c70] italic max-w-2xl">{blogAuthor.bio}</p>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-16">
          <h2 className="text-xl font-semibold text-[#4A4B4F] mb-5">Keep reading</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/blogs/${r.slug}`}
                className="group rounded-2xl bg-white border border-[#efe4d8] overflow-hidden hover:shadow-md transition-shadow"
              >
                {r.image && (
                  <img src={r.image} alt={r.imageAlt || r.title} className="w-full h-28 object-cover" loading="lazy" />
                )}
                <div className="p-5">
                  <span className="text-xs font-semibold text-[#6b6c70]">{r.category}</span>
                  <h3 className="mt-1.5 font-medium text-[#4A4B4F] leading-snug group-hover:text-[#1E2C2B] transition-colors">
                    {r.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default BlogPost;
