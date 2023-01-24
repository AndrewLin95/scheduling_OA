export type daysOfMonth = "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export interface Employee {
  certified: number,
  pendingCert: number,
  laborer: number,
}

export interface allEmployees {
  employees: Record<daysOfMonth, Employee>
}