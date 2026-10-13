import PaperExplorer from '@/components/paper-explorer';
import ThemeToggle from '@/components/theme-toggle';
import {
  categories,
  categoryById,
  essentialPapers,
  formatAuthors,
  latestPapers,
  papers,
} from '@/lib/papers';
import { resources, resourceTypeLabels } from '@/lib/resources';

const coreCategoryIds = ['discrete', 'continuous', 'hybrid', 'flow', 'latent', 'systems', 'agents'];

export default function Home() {
  const coreCategories = coreCategoryIds.map((id) => categoryById[id]);

  return (
    <>
      <a className="skip-link" href="#main-content">跳转到主要内容</a>
      <nav className="site-nav" aria-label="主导航">
        <div className="nav-inner">
          <a className="wordmark" href="#top" aria-label="dLLM Reading Map 首页">
            <strong>dLLM Reading Map</strong>
            <span>Diffusion Language Models</span>
          </a>
          <div className="nav-links">
            <a href="#start">阅读路径</a>
            <a href="#map">方法分类</a>
            <a href="#library">论文库</a>
            <a href="#resources">学习资源</a>
            <a href="#updates">更新机制</a>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <a className="nav-lab" href="https://zju-pil-lab.github.io/" target="_blank" rel="noreferrer">PIL Lab</a>
            <a
              className="nav-github"
              href="https://github.com/zju-pil-lab/dllm-reading-map"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">A RESEARCH INDEX · OCTOBER 2026</p>
          <h1>
            从 <em>Mask</em> 到 <em>Flow</em>，<br />
            读懂扩散语言模型。
          </h1>
          <p className="hero-deck">
            面向学生与研究者的开放学术索引。沿方法脉络建立知识结构，以首次公开日期追踪进展，并将论文、课程与长文连接为可执行的阅读路径。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#start">从 12 篇开始</a>
            <a className="plain-link" href="#library">浏览全部论文 →</a>
          </div>
        </div>

        <aside className="collection-summary" aria-labelledby="collection-title">
          <div className="summary-heading">
            <h2 id="collection-title">Collection summary</h2>
            <span>Verified 2026.10.13</span>
          </div>
          <dl>
            <div><dt>Curated papers</dt><dd>{papers.length}</dd></div>
            <div><dt>Core reading path</dt><dd>12</dd></div>
            <div><dt>Research categories</dt><dd>{categories.length}</dd></div>
            <div><dt>Sander references</dt><dd>81 / 81</dd></div>
          </dl>
          <p>类别构成主地图；时间、阅读层级与标签作为交叉索引。所有条目优先链接至论文的一手记录。</p>
        </aside>
      </section>

      <section className="section path-section" id="start">
        <div className="section-heading sticky-heading">
          <p className="eyebrow"><span /> START HERE</p>
          <h2>核心论文<br />阅读路径</h2>
          <p>先读 12 篇主干论文，理解范式怎样从离散扩散走向大模型、混合架构与 flow maps，再按自己的问题深入。</p>
          <div className="scope-note">
            <span>SCOPE</span>
            <p><b>必读</b>建立主干；<b>推荐</b>补齐分支；<b>前沿</b>追踪新进展；<b>背景</b>提供必要上下文。</p>
          </div>
        </div>
        <div className="paper-list">
          {essentialPapers.map((paper) => (
            <article className="paper-row" key={paper.id}>
              <span className="paper-index">{String(paper.essentialOrder).padStart(2, '0')}</span>
              <div>
                <p className="paper-year">{paper.year} · {categoryById[paper.category]?.label}</p>
                <h3><a href={paper.url} target="_blank" rel="noreferrer">{paper.title}</a></h3>
                <p>{paper.whyReadZh}</p>
              </div>
              <a href={paper.url} target="_blank" rel="noreferrer" aria-label={`打开论文：${paper.title}`}>↗</a>
            </article>
          ))}
          <a className="view-all" href="#library">完成主干后，进入完整论文库 <span>{papers.length} papers</span><b>→</b></a>
        </div>
      </section>

      <section className="latest-section" aria-labelledby="latest-title">
        <div className="latest-intro">
          <p className="eyebrow"><span /> LATEST VERIFIED</p>
          <h2 id="latest-title">最近加入</h2>
          <p>“最新”按论文首次公开日期排序，避免旧论文因新版修订重新跳到榜首。</p>
        </div>
        <div className="latest-grid">
          {latestPapers.map((paper, index) => (
            <article className="latest-card" key={paper.id}>
              <div className="latest-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <time dateTime={paper.published}>{paper.published}</time>
              </div>
              <p className="latest-category">{categoryById[paper.category]?.zh}</p>
              <h3><a href={paper.url} target="_blank" rel="noreferrer">{paper.title}</a></h3>
              <p>{formatAuthors(paper.authors, 3)}</p>
              <a className="latest-link" href={paper.url} target="_blank" rel="noreferrer" aria-label={`打开论文：${paper.title}`}>Paper ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="section map-section" id="map">
        <div className="section-heading">
          <p className="eyebrow">BROWSE BY RESEARCH FAMILY</p>
          <h2>方法分类与<br />时间索引</h2>
          <p>以离散扩散、连续扩散、Flow 与混合架构为方法主线，并将系统、智能体等研究问题纳入同一索引。点击任一类别即可进入对应论文列表。</p>
        </div>
        <div className="family-grid">
          {coreCategories.map((category, index) => {
            const count = papers.filter((paper) => paper.category === category.id).length;
            return (
              <a
                className={`family-card${category.id === 'agents' ? ' family-card-wide' : ''}`}
                href={`?category=${category.id}#library`}
                key={category.id}
              >
                <span className="family-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <div className="family-title">
                  <span className="family-label">{category.label}</span>
                  <h3>{category.zh}</h3>
                </div>
                <p>{category.description}</p>
                <div className="family-foot"><code>{category.formula}</code><span>{count} papers ↘</span></div>
              </a>
            );
          })}
        </div>
      </section>

      <section className="catalog-section" id="library">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow"><span /> THE LIBRARY</p>
            <h2>全部论文</h2>
          </div>
          <p>按标题、作者或标签搜索；按类别与阅读层级过滤。每条记录链接到论文的一手页面。</p>
        </div>
        <PaperExplorer papers={papers} />
      </section>

      <section className="learning-section" id="resources">
        <div className="learning-heading">
          <div>
            <p className="eyebrow"><span /> COURSES & LEARNING</p>
            <h2>课程与<br />学习资源</h2>
          </div>
          <p>学习资源与论文分开收录。优先选择能系统连接扩散语言模型理论、方法与实践的课程、长文和公开材料。</p>
        </div>

        <div className="learning-list">
          {resources.map((resource, index) => (
            <article className="learning-card" key={resource.id}>
              <div className="learning-index">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <b>{resourceTypeLabels[resource.type]}</b>
              </div>
              <div className="learning-main">
                <p className="learning-meta">{resource.source} · {resource.year} · {resource.level}</p>
                <h3><a href={resource.url} target="_blank" rel="noreferrer">{resource.title}</a></h3>
                <p className="learning-instructor">{resource.type === 'course' ? 'Instructor' : 'Author'} · {resource.creators.join(', ')}</p>
                <p className="learning-description">{resource.descriptionZh}</p>
                <p className="learning-why"><span>为什么推荐</span>{resource.whyUsefulZh}</p>
                <div className="learning-topics">
                  {resource.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <div className="learning-links">
                <a href={resource.url} target="_blank" rel="noreferrer">{resource.type === 'course' ? '课程主页' : '阅读全文'} <span>↗</span></a>
                {resource.codeUrl && <a href={resource.codeUrl} target="_blank" rel="noreferrer">课程代码 <span>↗</span></a>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="update-section" id="updates">
        <div className="update-lead">
          <p className="eyebrow">MAINTENANCE</p>
          <h2>论文收录与<br />更新机制</h2>
        </div>
        <div className="update-steps">
          <article><span>发现候选</span><h3>每周检索</h3><p>按 dLLM、masked diffusion、flow map、agentic dLLM、tool use 等关键词检索 arXiv 候选。</p></article>
          <article><span>确认内容</span><h3>人工审核</h3><p>自动化只创建候选清单；相关性、主分类和“为什么值得读”由实验室成员确认。</p></article>
          <article><span>发布记录</span><h3>校验上线</h3><p>数据校验、去重与构建检查通过后，网页自动更新；用 first-posted 日期维护 Latest。</p></article>
        </div>
      </section>

      <section className="source-section" id="contribute">
        <div>
          <p className="eyebrow"><span /> SOURCES & CREDIT</p>
          <h2>资料来源与引用说明</h2>
        </div>
        <div className="source-list">
          <a href="https://sander.ai/2026/08/24/continuous-dlms.html?v=1" target="_blank" rel="noreferrer">
            <span>01</span><div><b>Sander Dieleman · Continuous diffusion language models</b><p>完整导入其 81 条参考文献，并保留原始编号。</p></div><i>↗</i>
          </a>
          <a href="https://sander.ai/2026/05/06/flow-maps.html" target="_blank" rel="noreferrer">
            <span>02</span><div><b>Sander Dieleman · Learning the integral of a diffusion model</b><p>作为 Flow Map 进阶导读；dLLM 直接相关论文保留来源编号，通用基础方法归入 Diffusion + Flow Reading Map。</p></div><i>↗</i>
          </a>
          <a href="https://github.com/AIDASLab/Awesome-Diffusion-LLM" target="_blank" rel="noreferrer">
            <span>03</span><div><b>AIDASLab · Awesome-Diffusion-LLM</b><p>作为领域 watchlist 与交叉核查来源；本站分类、数据与中文导读独立整理。</p></div><i>↗</i>
          </a>
          <div className="source-item">
            <span>04</span><div><b>Primary records · arXiv / proceedings</b><p>标题、作者、首次公开日期和链接以一手论文页面为准。</p></div><i>✓</i>
          </div>
        </div>
      </section>

      <footer>
        <div>dLLM Reading Map</div>
        <p>Probabilistic Inference and Learning Lab</p>
        <p>
          <a href="https://github.com/zju-pil-lab/dllm-reading-map" target="_blank" rel="noreferrer">GITHUB ↗</a>
          {' · '}LAST VERIFIED · 2026.10.13
        </p>
      </footer>
      </main>
    </>
  );
}
