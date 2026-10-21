import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Package,
  CircleDollarSign,
  Truck,
  ChevronRight,
  Calendar,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { Card } from '@/components/primitives/Card';
import { Chip } from '@/components/primitives/Chip';
import { Section } from '@/components/primitives/Section';
import { SectionHeader } from '@/components/primitives/SectionHeader';
import { ChipFilterGroup } from '@/components/composite/ChipFilterGroup';
import { orders, STAGE_LABELS, type OrderStage } from '@/state/orders';
import { products } from '@/state/catalog';
import styles from './DashboardPage.module.css';

type Range = '30d' | '90d' | '6m' | 'ytd';

const fmt = (n: number) => `${n.toLocaleString('fr-FR')} FCFA`;

const TREND: Record<Range, { month: string; spend: number; orders: number }[]> = {
  '30d': [
    { month: 'J1', spend: 120000, orders: 1 },
    { month: 'J2', spend: 280000, orders: 2 },
    { month: 'J3', spend: 180000, orders: 1 },
    { month: 'J4', spend: 460000, orders: 3 },
  ],
  '90d': [
    { month: 'Juil', spend: 850000, orders: 6 },
    { month: 'Août', spend: 1240000, orders: 9 },
    { month: 'Sept', spend: 1480000, orders: 11 },
  ],
  '6m': [
    { month: 'Avril', spend: 920000, orders: 7 },
    { month: 'Mai', spend: 1180000, orders: 9 },
    { month: 'Juin', spend: 1320000, orders: 10 },
    { month: 'Juil', spend: 850000, orders: 6 },
    { month: 'Août', spend: 1240000, orders: 9 },
    { month: 'Sept', spend: 1480000, orders: 11 },
  ],
  ytd: [
    { month: 'T1', spend: 3200000, orders: 24 },
    { month: 'T2', spend: 3800000, orders: 29 },
    { month: 'T3', spend: 4500000, orders: 35 },
  ],
};

const COLORS = ['#C4122F', '#1B4E7A', '#1F7A4D', '#B4700E', '#5C6673'];

export default function DashboardPage() {
  const [range, setRange] = useState<Range>('90d');

  const stats = useMemo(() => {
    const totalSpend = orders.reduce((sum, o) => sum + o.totalXof, 0);
    const inProgress = orders.filter(
      (o) => o.currentStage !== 'delivered' && o.currentStage !== 'cancelled',
    ).length;
    const activeProducts = products.length;
    const delivered = orders.filter((o) => o.currentStage === 'delivered').length;
    return { totalSpend, inProgress, activeProducts, delivered };
  }, []);

  const distribution = useMemo(() => {
    const counts = new Map<OrderStage, number>();
    orders.forEach((o) => counts.set(o.currentStage, (counts.get(o.currentStage) ?? 0) + 1));
    return Array.from(counts.entries()).map(([stage, value]) => ({
      name: STAGE_LABELS[stage],
      value,
    }));
  }, []);

  const activeOrders = orders
    .filter((o) => o.currentStage !== 'delivered' && o.currentStage !== 'cancelled')
    .slice(0, 4);

  return (
    <div className={styles.container}>
      <Section variant="flat" spacing="sm" ariaLabel="Titre">
        <h1 className={styles.title}>Tableau de bord</h1>
        <p className={styles.subtitle}>Synthèse de vos importations via M&amp;C Connect</p>
      </Section>

      <Section variant="flat" spacing="sm" ariaLabel="Période">
        <ChipFilterGroup
          ariaLabel="Période"
          value={range}
          onChange={setRange}
          options={[
            { value: '30d', label: '30 j' },
            { value: '90d', label: '90 j' },
            { value: '6m', label: '6 mois' },
            { value: 'ytd', label: 'Année' },
          ]}
        />
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Indicateurs clés">
        <div className={styles.kpis}>
          <Card>
            <div className={styles.kpiHead}>
              <span className={styles.kpiLabel}>
                <CircleDollarSign size={16} strokeWidth={1.5} aria-hidden="true" />
                Total engagé
              </span>
              <Chip tone="success" size="sm">
                +12%
              </Chip>
            </div>
            <strong className={styles.kpiValue}>{fmt(stats.totalSpend)}</strong>
            <span className={styles.kpiSub}>vs période précédente</span>
          </Card>
          <Card>
            <div className={styles.kpiHead}>
              <span className={styles.kpiLabel}>
                <TrendingUp size={16} strokeWidth={1.5} aria-hidden="true" />
                En cours
              </span>
              <Chip tone="info" size="sm">
                Active
              </Chip>
            </div>
            <strong className={styles.kpiValue}>{stats.inProgress}</strong>
            <span className={styles.kpiSub}>commandes à suivre</span>
          </Card>
          <Card>
            <div className={styles.kpiHead}>
              <span className={styles.kpiLabel}>
                <Truck size={16} strokeWidth={1.5} aria-hidden="true" />
                Livrées
              </span>
              <Chip tone="success" size="sm">
                OK
              </Chip>
            </div>
            <strong className={styles.kpiValue}>{stats.delivered}</strong>
            <span className={styles.kpiSub}>cette période</span>
          </Card>
          <Card>
            <div className={styles.kpiHead}>
              <span className={styles.kpiLabel}>
                <Package size={16} strokeWidth={1.5} aria-hidden="true" />
                Catalogue
              </span>
              <Chip tone="neutral" size="sm">
                M&amp;C
              </Chip>
            </div>
            <strong className={styles.kpiValue}>{stats.activeProducts}</strong>
            <span className={styles.kpiSub}>produits vérifiés</span>
          </Card>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Évolution des dépenses">
        <SectionHeader title="Évolution des dépenses" trailing={<Chip size="sm">{range.toUpperCase()}</Chip>} />
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={TREND[range]} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="grad-spend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C4122F" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#C4122F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E7EB" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="#5C6673" fontSize={12} />
              <YAxis
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                tickLine={false}
                axisLine={false}
                stroke="#5C6673"
                fontSize={12}
                width={42}
              />
              <Tooltip
                formatter={(v: number) => fmt(v)}
                contentStyle={{
                  background: '#FFFFFF',
                  border: '1px solid #E4E7EB',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Area
                type="monotone"
                dataKey="spend"
                stroke="#C4122F"
                strokeWidth={2}
                fill="url(#grad-spend)"
                name="Dépenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <Section variant="card" spacing="md" ariaLabel="Répartition des statuts">
        <SectionHeader title="Répartition par statut" />
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={distribution}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={2}
              >
                {distribution.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                verticalAlign="bottom"
                height={32}
                iconType="circle"
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <Section variant="flat" spacing="md" ariaLabel="Commandes en cours">
        <SectionHeader
          title="Commandes en cours"
          trailing={
            <Link to="/orders" className={styles.seeAll}>
              Tout voir
            </Link>
          }
        />
        <ul className={styles.list}>
          {activeOrders.map((o) => (
            <li key={o.id}>
              <Link to={`/orders/${o.id}`} className={styles.item}>
                <div>
                  <span className={styles.id}>{o.id}</span>
                  <span className={styles.name}>{o.productTitle}</span>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.amount}>{fmt(o.totalXof)}</span>
                  <Chip tone="info" size="sm">
                    {STAGE_LABELS[o.currentStage]}
                  </Chip>
                  <ChevronRight
                    size={16}
                    strokeWidth={1.5}
                    className={styles.chevron}
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section variant="surface" spacing="sm" ariaLabel="Période active">
        <div className={styles.periodNote}>
          <Calendar size={14} strokeWidth={1.5} aria-hidden="true" />
          Période active : <strong>{range === '30d' ? '30 derniers jours' : range === '90d' ? '90 derniers jours' : range === '6m' ? '6 derniers mois' : 'Année en cours'}</strong>
        </div>
      </Section>
    </div>
  );
}