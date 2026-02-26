"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Search, ChevronUp, ChevronDown, CheckSquare } from "lucide-react";

// ─── Inline data ──────────────────────────────────────────────────────────────

type ActionItemStatus = "pending" | "in-progress" | "completed" | "overdue";
type Priority = "high" | "medium" | "low";

interface ActionItem {
  id: string;
  text: string;
  assignee: string;
  meetingTitle: string;
  dueDate: string;
  status: ActionItemStatus;
  priority: Priority;
  createdAt: string;
}

const ACTION_ITEMS: ActionItem[] = [
  {
    id: "ai-01",
    text: "Set up revised sandbox environments for three stalled enterprise accounts",
    assignee: "James Okafor",
    meetingTitle: "Q1 Sales Strategy Review",
    dueDate: "2026-02-28",
    status: "in-progress",
    priority: "high",
    createdAt: "2026-02-24",
  },
  {
    id: "ai-02",
    text: "Send personalized technical briefs to all three dark enterprise prospects",
    assignee: "James Okafor",
    meetingTitle: "Q1 Sales Strategy Review",
    dueDate: "2026-02-28",
    status: "pending",
    priority: "high",
    createdAt: "2026-02-24",
  },
  {
    id: "ai-03",
    text: "Compile mid-market close data for Q1 board presentation",
    assignee: "Priya Nair",
    meetingTitle: "Q1 Sales Strategy Review",
    dueDate: "2026-03-01",
    status: "pending",
    priority: "medium",
    createdAt: "2026-02-24",
  },
  {
    id: "ai-04",
    text: "Send Acme Corp noisy-environment accuracy benchmark one-pager",
    assignee: "Sarah Lin",
    meetingTitle: "Enterprise Demo — Acme Corp",
    dueDate: "2026-02-23",
    status: "completed",
    priority: "high",
    createdAt: "2026-02-22",
  },
  {
    id: "ai-05",
    text: "Confirm buying committee composition with Tom Bridges before next call",
    assignee: "Sarah Lin",
    meetingTitle: "Enterprise Demo — Acme Corp",
    dueDate: "2026-02-26",
    status: "in-progress",
    priority: "high",
    createdAt: "2026-02-22",
  },
  {
    id: "ai-06",
    text: "Schedule Round 3 follow-up with backend engineer candidate",
    assignee: "Rachel Kim",
    meetingTitle: "Backend Engineer Interview — Round 2",
    dueDate: "2026-02-21",
    status: "overdue",
    priority: "high",
    createdAt: "2026-02-21",
  },
  {
    id: "ai-07",
    text: "Review candidate's GitHub for distributed systems contributions before Round 3",
    assignee: "Dev Patel",
    meetingTitle: "Backend Engineer Interview — Round 2",
    dueDate: "2026-02-25",
    status: "pending",
    priority: "medium",
    createdAt: "2026-02-21",
  },
  {
    id: "ai-08",
    text: "Scope Q2 calendar integration to read-only and update roadmap documentation",
    assignee: "Aiko Tanaka",
    meetingTitle: "Product Roadmap Sync",
    dueDate: "2026-02-25",
    status: "completed",
    priority: "high",
    createdAt: "2026-02-23",
  },
  {
    id: "ai-09",
    text: "Model headcount requirements for AI coaching module build-out",
    assignee: "Ben Harlow",
    meetingTitle: "Product Roadmap Sync",
    dueDate: "2026-02-27",
    status: "in-progress",
    priority: "medium",
    createdAt: "2026-02-23",
  },
  {
    id: "ai-10",
    text: "Communicate Q2 roadmap changes to Customer Success for proactive enterprise comms",
    assignee: "Aiko Tanaka",
    meetingTitle: "Product Roadmap Sync",
    dueDate: "2026-02-20",
    status: "overdue",
    priority: "medium",
    createdAt: "2026-02-23",
  },
  {
    id: "ai-11",
    text: "Send RetailBase retail case study with comparable transaction volumes",
    assignee: "Marcus Reid",
    meetingTitle: "Upsell Discovery — RetailBase",
    dueDate: "2026-02-17",
    status: "completed",
    priority: "medium",
    createdAt: "2026-02-14",
  },
  {
    id: "ai-12",
    text: "Prepare GlobalTech pilot agreement draft as alternative to full contract",
    assignee: "Priya Nair",
    meetingTitle: "Partnership Discovery — GlobalTech",
    dueDate: "2026-02-20",
    status: "overdue",
    priority: "high",
    createdAt: "2026-02-17",
  },
  {
    id: "ai-13",
    text: "Update CRM with outcome notes from GlobalTech discovery call",
    assignee: "Marcus Reid",
    meetingTitle: "Partnership Discovery — GlobalTech",
    dueDate: "2026-02-19",
    status: "completed",
    priority: "low",
    createdAt: "2026-02-17",
  },
  {
    id: "ai-14",
    text: "Share board feedback on Series B investor demo deck with design team",
    assignee: "Aiko Tanaka",
    meetingTitle: "Investor Update Call — Series B",
    dueDate: "2026-02-20",
    status: "overdue",
    priority: "medium",
    createdAt: "2026-02-18",
  },
  {
    id: "ai-15",
    text: "Design onboarding email sequence for Jordan Park — tools, team Slack channels, access",
    assignee: "Rachel Kim",
    meetingTitle: "New Hire Onboarding — Jordan Park",
    dueDate: "2026-02-14",
    status: "completed",
    priority: "low",
    createdAt: "2026-02-10",
  },
  {
    id: "ai-16",
    text: "Create 30-60-90 day success metrics doc for Jordan to self-track progress",
    assignee: "Rachel Kim",
    meetingTitle: "New Hire Onboarding — Jordan Park",
    dueDate: "2026-02-17",
    status: "completed",
    priority: "low",
    createdAt: "2026-02-10",
  },
  {
    id: "ai-17",
    text: "Send meeting summary and technical writeup from board AI features showcase",
    assignee: "Ben Harlow",
    meetingTitle: "Board Demo — AI Features Showcase",
    dueDate: "2026-02-13",
    status: "completed",
    priority: "medium",
    createdAt: "2026-02-11",
  },
];

const STATUS_CYCLE: Record<ActionItemStatus, ActionItemStatus> = {
  pending: "in-progress",
  "in-progress": "completed",
  completed: "pending",
  overdue: "in-progress",
};

const STATUS_META: Record<
  ActionItemStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "text-[color:var(--warning)] bg-[color:var(--warning)]/10 border-0",
  },
  "in-progress": {
    label: "In Progress",
    className: "text-primary bg-primary/10 border-0",
  },
  completed: {
    label: "Completed",
    className: "text-[color:var(--success)] bg-[color:var(--success)]/10 border-0",
  },
  overdue: {
    label: "Overdue",
    className: "text-destructive bg-destructive/10 border-0",
  },
};

const PRIORITY_META: Record<Priority, { label: string; className: string }> = {
  high: {
    label: "High",
    className: "text-destructive bg-destructive/8 border-0",
  },
  medium: {
    label: "Medium",
    className: "text-[color:var(--warning)] bg-[color:var(--warning)]/8 border-0",
  },
  low: {
    label: "Low",
    className: "text-muted-foreground bg-muted border-0",
  },
};

function StatusBadge({
  status,
  onClick,
}: {
  status: ActionItemStatus;
  onClick: () => void;
}) {
  const meta = STATUS_META[status];
  return (
    <Badge
      variant="outline"
      className={cn(
        "text-xs font-medium rounded-full cursor-pointer hover:opacity-80 transition-opacity duration-100",
        meta.className
      )}
      onClick={onClick}
      title="Click to advance status"
    >
      {meta.label}
    </Badge>
  );
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium rounded-full", meta.className)}
    >
      {meta.label}
    </Badge>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  const today = new Date("2026-02-26");
  const isOverdue = d < today;
  const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return { label, isOverdue };
}

type SortKey = "dueDate" | "priority" | "status" | "assignee";

const PRIORITY_ORDER: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
const STATUS_ORDER: Record<ActionItemStatus, number> = {
  overdue: 0,
  "in-progress": 1,
  pending: 2,
  completed: 3,
};

export default function ActionItemsPage() {
  const [localItems, setLocalItems] = useState(ACTION_ITEMS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ActionItemStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("dueDate");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function advanceStatus(id: string) {
    setLocalItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: STATUS_CYCLE[item.status] }
          : item
      )
    );
  }

  const displayed = useMemo(() => {
    const q = search.toLowerCase();
    return localItems
      .filter((item) => {
        const matchSearch =
          q === "" ||
          item.text.toLowerCase().includes(q) ||
          item.assignee.toLowerCase().includes(q) ||
          item.meetingTitle.toLowerCase().includes(q);
        const matchStatus =
          statusFilter === "all" || item.status === statusFilter;
        const matchPriority =
          priorityFilter === "all" || item.priority === priorityFilter;
        return matchSearch && matchStatus && matchPriority;
      })
      .sort((a, b) => {
        let diff = 0;
        if (sortKey === "dueDate") {
          diff = a.dueDate.localeCompare(b.dueDate);
        } else if (sortKey === "priority") {
          diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
        } else if (sortKey === "status") {
          diff = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
        } else if (sortKey === "assignee") {
          diff = a.assignee.localeCompare(b.assignee);
        }
        return sortDir === "asc" ? diff : -diff;
      });
  }, [localItems, search, statusFilter, priorityFilter, sortKey, sortDir]);

  // Summary stats
  const total = localItems.length;
  const pending = localItems.filter((i) => i.status === "pending").length;
  const inProgress = localItems.filter((i) => i.status === "in-progress").length;
  const completed = localItems.filter((i) => i.status === "completed").length;
  const overdue = localItems.filter((i) => i.status === "overdue").length;

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3" />
    ) : (
      <ChevronDown className="w-3 h-3" />
    );
  }

  return (
    <div className="page-container space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Action Items</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Commitments captured across all recorded sessions
          </p>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          Export
        </Button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="aesthetic-card p-3 text-center">
          <p className="text-2xl font-bold font-mono text-foreground">{total}</p>
          <p className="text-xs text-muted-foreground mt-0.5">Total</p>
        </div>
        <div className="aesthetic-card p-3 text-center">
          <p className="text-2xl font-bold font-mono text-[color:var(--warning)]">
            {pending}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Pending</p>
        </div>
        <div className="aesthetic-card p-3 text-center">
          <p className="text-2xl font-bold font-mono text-primary">
            {inProgress}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">In Progress</p>
        </div>
        <div className="aesthetic-card p-3 text-center">
          <p className="text-2xl font-bold font-mono text-[color:var(--success)]">
            {completed}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Completed</p>
        </div>
        <div className="aesthetic-card p-3 text-center">
          <p className="text-2xl font-bold font-mono text-destructive">
            {overdue}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">Overdue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search action items, assignees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as ActionItemStatus | "all")}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={priorityFilter}
          onValueChange={(v) => setPriorityFilter(v as Priority | "all")}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="All priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-muted-foreground shrink-0">
          {displayed.length} of {total}
        </span>
      </div>

      {/* Table */}
      <div className="aesthetic-card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground w-[35%]">
                  Action Item
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("assignee")}
                >
                  <div className="flex items-center gap-1">
                    Assignee
                    <SortIcon col="assignee" />
                  </div>
                </TableHead>
                <TableHead className="bg-muted/50 text-xs font-medium text-muted-foreground">
                  Meeting Source
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("dueDate")}
                >
                  <div className="flex items-center gap-1">
                    Due Date
                    <SortIcon col="dueDate" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("priority")}
                >
                  <div className="flex items-center gap-1">
                    Priority
                    <SortIcon col="priority" />
                  </div>
                </TableHead>
                <TableHead
                  className="bg-muted/50 text-xs font-medium text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors duration-100"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-1">
                    Status
                    <SortIcon col="status" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayed.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-32 text-center text-sm text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <CheckSquare className="w-6 h-6 text-muted-foreground/40" />
                      No action items match this filter.
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                displayed.map((item) => {
                  const { label: dueLabel, isOverdue: isDue } = formatDate(
                    item.dueDate
                  );
                  return (
                    <TableRow
                      key={item.id}
                      className={cn(
                        "hover:bg-[color:var(--surface-hover)] transition-colors duration-100",
                        item.status === "completed" && "opacity-60"
                      )}
                    >
                      <TableCell className="text-sm font-medium max-w-xs">
                        <span
                          className={cn(
                            item.status === "completed" && "line-through text-muted-foreground"
                          )}
                        >
                          {item.text}
                        </span>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {item.assignee}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[160px]">
                        <span className="line-clamp-1">{item.meetingTitle}</span>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "text-xs font-mono whitespace-nowrap",
                          isDue && item.status !== "completed"
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {dueLabel}
                      </TableCell>
                      <TableCell>
                        <PriorityBadge priority={item.priority} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={item.status}
                          onClick={() => advanceStatus(item.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Tip: Click any status badge to advance it through the workflow.
      </p>
    </div>
  );
}
