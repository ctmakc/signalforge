import { PageShell } from '@/components/layout/page-shell'

const kpis = [
  { label: 'Total Revenue', value: '$124,500', icon: 'payments', trend: '+14.2%', trendUp: true },
  { label: 'Total Spend', value: '$28,240', icon: 'account_balance_wallet', trend: '+1.1%', trendUp: null },
  { label: 'Overall ROI', value: '341%', icon: 'rocket_launch', trend: '+22.4%', trendUp: true },
  { label: 'Avg Conversion Rate', value: '8.4%', icon: 'filter_alt', trend: '+0.8%', trendUp: true, highlight: true },
]

const funnelSteps = [
  { label: 'Total Signals', sub: '142,050 detected', pct: 100 },
  { label: 'Qualified Leads', sub: '38,400 matching criteria', pct: 27 },
  { label: 'Engaged', sub: '12,150 replied', pct: 8.5 },
  { label: 'Meetings Booked', sub: '3,410 scheduled', pct: 2.4 },
  { label: 'Closed Won', sub: '1,124 deals', pct: 0.8, green: true },
]

const barChart = [
  { label: 'W1', rev: 40, spend: 15 },
  { label: 'W2', rev: 55, spend: 20 },
  { label: 'W3', rev: 45, spend: 18 },
  { label: 'W4', rev: 80, spend: 25 },
]

const platforms = [
  { name: 'LinkedIn', color: '#0077b5', pct: 45 },
  { name: 'Gmail / Cold Email', color: '#EA4335', pct: 32 },
  { name: 'X / Twitter', color: '#727687', pct: 15, colorVar: 'var(--color-outline)' },
  { name: 'Other Channels', color: '#c2c6d8', pct: 8, colorVar: 'var(--color-outline-variant)' },
]

const keywords = [
  { label: '"Series B funding"', type: 'Trigger Event', rate: '12.4%', delta: '+2.1%', up: true, highlight: true },
  { label: '"Hiring VP Sales"', type: 'Job Posting', rate: '9.8%', delta: '+0.5%', up: true },
  { label: '"New Office Opened"', type: 'Company News', rate: '8.1%', delta: '0.0%', up: null },
  { label: '"Tech Stack: React"', type: 'Technology', rate: '7.5%', delta: '-1.2%', up: false },
]

export default function AnalyticsPage() {
  return (
    <PageShell
      title="Analytics Overview"
      subtitle="Track campaign performance and conversion metrics."
      headerActions={
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-lg hover:bg-[color:var(--color-surface-container-low)] transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 18 }}>calendar_today</span>
            <span className="text-label-md text-[color:var(--color-on-surface)]">Last 30 Days</span>
            <span className="material-symbols-outlined text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 18 }}>expand_more</span>
          </div>
          <button className="bg-[color:var(--color-primary)] text-[color:var(--color-on-primary)] text-label-md px-5 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>download</span>
            Export Report
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-6">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 flex flex-col relative overflow-hidden"
            >
              {kpi.highlight && <div className="absolute right-0 top-0 w-32 h-32 bg-[color:var(--color-primary)]/5 rounded-bl-full -z-0" />}
              <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="text-label-md text-[color:var(--color-on-surface-variant)] uppercase tracking-wider">{kpi.label}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${kpi.highlight ? 'bg-[color:var(--color-primary)]/10 text-[color:var(--color-primary)]' : 'bg-[color:var(--color-surface-container)] text-[color:var(--color-primary)]'}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{kpi.icon}</span>
                </div>
              </div>
              <div className={`text-display relative z-10 ${kpi.highlight ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-on-surface)]'}`}>{kpi.value}</div>
              <div className="flex items-center gap-1 mt-2 relative z-10">
                <span className={`material-symbols-outlined ${kpi.trendUp ? 'text-[color:var(--color-secondary-fixed-dim)]' : 'text-[color:var(--color-outline)]'}`} style={{ fontSize: 16 }}>
                  {kpi.trendUp === true ? 'trending_up' : kpi.trendUp === false ? 'trending_down' : 'trending_flat'}
                </span>
                <span className={`text-label-md ${kpi.trendUp ? 'text-[color:var(--color-secondary-fixed-dim)]' : 'text-[color:var(--color-outline)]'}`}>{kpi.trend}</span>
                <span className="text-body-md text-[color:var(--color-outline)] text-xs ml-1">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-12 gap-6">
          {/* Conversion Funnel */}
          <div className="col-span-8 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)]">
              <h2 className="text-h2 text-[color:var(--color-on-surface)]">Conversion Funnel</h2>
              <button className="text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)]">
                <span className="material-symbols-outlined">more_horiz</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4">
              {funnelSteps.map((step) => (
                <div key={step.label} className="flex items-center gap-4 group">
                  <div className="w-40 flex-shrink-0 text-right">
                    <div className="text-label-md text-[color:var(--color-on-surface)]">{step.label}</div>
                    <div className="text-body-md text-[color:var(--color-on-surface-variant)] text-xs">{step.sub}</div>
                  </div>
                  <div className="flex-1 h-12 bg-[color:var(--color-surface-container)] rounded-r-lg relative overflow-hidden">
                    <div
                      className={`absolute left-0 top-0 bottom-0 ${step.green ? 'bg-[color:var(--color-secondary-fixed-dim)] border-l-4 border-[color:var(--color-secondary)]' : 'bg-[color:var(--color-primary-fixed)] border-l-4 border-[color:var(--color-primary)]'} transition-all duration-500 group-hover:brightness-105`}
                      style={{ width: `${step.pct}%` }}
                    />
                  </div>
                  <div className={`w-20 flex-shrink-0 text-label-md ${step.green ? 'text-[color:var(--color-secondary)] font-bold' : 'text-[color:var(--color-on-surface)]'}`}>{step.pct}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue vs Spend */}
          <div className="col-span-4 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)]">
              <h2 className="text-h2 text-[color:var(--color-on-surface)]">Revenue vs Spend</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]" />
                  <span className="text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 10 }}>Rev</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[color:var(--color-outline-variant)]" />
                  <span className="text-[color:var(--color-on-surface-variant)]" style={{ fontSize: 10 }}>Spd</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex items-end justify-between gap-3 pb-4 pt-8 relative">
              <div className="absolute inset-0 flex flex-col justify-between pt-8 pb-4 pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="w-full border-b border-dashed border-[color:var(--color-surface-container-high)]" />
                ))}
              </div>
              {barChart.map((w) => (
                <div key={w.label} className="flex-1 flex flex-col justify-end items-center gap-1 z-10 h-full group">
                  <div
                    className="w-full bg-[color:var(--color-primary)] rounded-t-sm group-hover:opacity-80 transition-opacity relative"
                    style={{ height: `${w.rev}%` }}
                  >
                    <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-[color:var(--color-inverse-surface)] text-[color:var(--color-inverse-on-surface)] text-[10px] px-2 py-1 rounded whitespace-nowrap">
                      ${w.rev * 400 / 10}k
                    </div>
                  </div>
                  <div className="w-full bg-[color:var(--color-outline-variant)] rounded-b-sm" style={{ height: `${w.spend}%` }} />
                  <span className="text-[color:var(--color-outline)] mt-2" style={{ fontSize: 10 }}>{w.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts row 2 */}
        <div className="grid grid-cols-12 gap-6">
          {/* Platform Performance */}
          <div className="col-span-6 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)]">
              <h2 className="text-h2 text-[color:var(--color-on-surface)]">Platform Performance</h2>
              <button className="text-[color:var(--color-on-surface-variant)] hover:text-[color:var(--color-on-surface)]">
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>open_in_new</span>
              </button>
            </div>
            <div className="flex-1 flex flex-col gap-5 justify-center">
              {platforms.map((p) => (
                <div key={p.name} className="flex flex-col gap-1">
                  <div className="flex justify-between items-end">
                    <span className="text-label-md text-[color:var(--color-on-surface)] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.colorVar ? `var(${p.colorVar.replace('var(', '').replace(')', '')})` : p.color }} />
                      {p.name}
                    </span>
                    <span className="text-body-md text-[color:var(--color-on-surface-variant)] text-xs">{p.pct}% of total</span>
                  </div>
                  <div className="w-full h-3 bg-[color:var(--color-surface-container)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${p.pct}%`, backgroundColor: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Converting Keywords */}
          <div className="col-span-6 bg-[color:var(--color-surface-container-lowest)] border border-[color:var(--color-outline-variant)] rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[color:var(--color-surface-container-high)]">
              <h2 className="text-h2 text-[color:var(--color-on-surface)]">Top Converting Keywords</h2>
              <div className="text-xs text-label-md px-2 py-1 bg-[color:var(--color-surface-container)] rounded text-[color:var(--color-on-surface-variant)]">By Conversion Rate</div>
            </div>
            <div className="flex flex-wrap gap-3">
              {keywords.map((kw) => (
                <div
                  key={kw.label}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg flex-1 hover:border-[color:var(--color-primary)] transition-colors cursor-default ${
                    kw.highlight
                      ? 'border border-[color:var(--color-primary-fixed)] bg-[color:var(--color-surface-bright)]'
                      : 'border border-[color:var(--color-outline-variant)] bg-[color:var(--color-surface-bright)]'
                  }`}
                  style={{ minWidth: 200 }}
                >
                  <div className="flex flex-col">
                    <span className="text-label-md text-[color:var(--color-on-surface)]">{kw.label}</span>
                    <span className="text-[color:var(--color-on-surface-variant)] mt-0.5" style={{ fontSize: 10 }}>{kw.type}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`text-h2 ${kw.highlight ? 'text-[color:var(--color-primary)]' : 'text-[color:var(--color-on-surface)]'}`}>{kw.rate}</span>
                    <span
                      className={`flex items-center text-label-md ${kw.up === true ? 'text-[color:var(--color-secondary-fixed-dim)]' : kw.up === false ? 'text-[color:var(--color-error)]' : 'text-[color:var(--color-outline)]'}`}
                      style={{ fontSize: 10 }}
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
                        {kw.up === true ? 'arrow_upward' : kw.up === false ? 'arrow_downward' : 'horizontal_rule'}
                      </span>
                      {kw.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
