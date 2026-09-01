"use client"

import { useEffect, useState } from "react"

// TODO: This entire page is a single monolithic component.
// Your task is to decompose it into proper React components with typed props.
// Extract components into src/components/ and define TypeScript interfaces.

export default function TeamDirectoryPage() {
  const [employees, setEmployees] = useState<any[]>([])
  const [departments, setDepartments] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      const { getEmployees, getDepartments } = await import("@/api")
      const [emps, depts] = await Promise.all([getEmployees(), getDepartments()])

      setEmployees(emps)
      setDepartments(depts)
      setLoading(false)
    }

    loadData()
  }, [])

  // TODO: These filters work independently but don't combine properly.
  // When a department is selected, search should filter within that department.
  // Currently, selecting a department ignores the search, and searching ignores the department.
  const filteredEmployees = search
    ? employees.filter((emp: any) => emp.name.toLowerCase().includes(search.toLowerCase()))
    : selectedDepartment
      ? employees.filter((emp: any) => emp.department === selectedDepartment)
      : employees

  if (loading) {
    return (
      <div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Team Directory</h1>
          <p className="text-muted-foreground mt-2 text-lg">Find and connect with your colleagues</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-muted h-64 animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Team Directory</h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Find and connect with your colleagues (
          {filteredEmployees.length}
          {" "}
          of
          {" "}
          {employees.length}
          )
        </p>
      </div>

      {/* Search Bar - TODO: Extract into SearchBar component */}
      <div className="mb-6">
        <input
          className="bg-background border-input focus:ring-ring w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          placeholder="Search employees by name..."
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Department Filter - TODO: Extract into DepartmentFilter component */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            selectedDepartment === ""
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
          onClick={() => setSelectedDepartment("")}
        >
          All (
          {employees.length}
          )
        </button>
        {departments.map((dept: any) => (
          <button
            key={dept.slug}
            type="button"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              selectedDepartment === dept.slug
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
            onClick={() => setSelectedDepartment(dept.slug)}
          >
            {dept.name}
            {" "}
            (
            {dept.employeeCount}
            )
          </button>
        ))}
      </div>

      {/* Employee Grid - TODO: Extract into EmployeeGrid and EmployeeCard components */}
      {filteredEmployees.length === 0
        ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground text-lg">No employees found matching your criteria.</p>
            </div>
          )
        : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredEmployees.map((emp: any) => (
                <div
                  key={emp.id}
                  className="bg-card border-border cursor-pointer overflow-hidden rounded-lg border transition-shadow hover:shadow-lg"
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedEmployee(emp)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setSelectedEmployee(emp)
                  }}
                >
                  <div className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        alt={emp.name}
                        className="h-16 w-16 rounded-full object-cover"
                        src={emp.avatar}
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-semibold">{emp.name}</h3>
                        <p className="text-muted-foreground truncate text-sm">{emp.role}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-xs font-medium capitalize">
                        {emp.department}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {emp.skills.slice(0, 3).map((skill: any) => (
                        <span
                          key={skill}
                          className="bg-accent text-accent-foreground rounded px-2 py-0.5 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {emp.skills.length > 3 && (
                        <span className="text-muted-foreground text-xs">
                          +
                          {emp.skills.length - 3}
                          {" "}
                          more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

      {/* Employee Detail Modal/Overlay - TODO: Extract into EmployeeDetail component */}
      {selectedEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="button"
          tabIndex={0}
          onClick={() => setSelectedEmployee(null)}
          onKeyDown={(e) => {
            if (e.key === "Escape")
              setSelectedEmployee(null)
          }}
        >
          <div
            className="bg-card border-border w-full max-w-lg overflow-hidden rounded-xl border shadow-xl"
            role="button"
            tabIndex={0}
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    alt={selectedEmployee.name}
                    className="h-20 w-20 rounded-full object-cover"
                    src={selectedEmployee.avatar}
                  />
                  <div>
                    <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                    <p className="text-muted-foreground">{selectedEmployee.role}</p>
                    <span className="bg-secondary text-secondary-foreground mt-1 inline-block rounded-full px-3 py-1 text-xs font-medium capitalize">
                      {selectedEmployee.department}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground text-xl"
                  onClick={() => setSelectedEmployee(null)}
                >
                  ✕
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Email</p>
                    <p className="mt-1 text-sm">{selectedEmployee.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Phone</p>
                    <p className="mt-1 text-sm">{selectedEmployee.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs font-medium uppercase">Joined</p>
                    <p className="mt-1 text-sm">
                      {new Date(selectedEmployee.joinDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-muted-foreground mb-2 text-xs font-medium uppercase">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployee.skills.map((skill: any) => (
                      <span
                        key={skill}
                        className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
