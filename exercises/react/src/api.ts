import { fakerEN_GB as faker } from "@faker-js/faker"

import { delay } from "./utils"

export type Employee = ReturnType<typeof generateData>["employees"][number]

export type Department = ReturnType<typeof generateData>["departments"][number]

function generateData() {
  faker.seed(123)

  const departments = [
    { name: "Operations", slug: "operations", employeeCount: 0 },
    { name: "Checkouts", slug: "checkouts", employeeCount: 0 },
    { name: "Merchandising", slug: "merchandising", employeeCount: 0 },
    { name: "Stockroom", slug: "stockroom", employeeCount: 0 },
    { name: "Security", slug: "security", employeeCount: 0 },
  ]

  const rolePool = [
    "Store Manager",
    "Assistant Manager",
    "Department Supervisor",
    "Visual Merchandiser",
    "Sales Associate",
    "Senior Sales Associate",
    "Loss Prevention Officer",
    "Stockroom Associate",
    "Cash Office Associate",
    "Customer Service Assistant",
  ]

  const skillPool = [
    "Customer Service",
    "Visual Merchandising",
    "Till Operation",
    "Cash Handling",
    "Stock Replenishment",
    "Delivery Processing",
    "Fitting Room Service",
    "Loss Prevention",
    "Health & Safety",
    "Team Leadership",
    "Rota Planning",
    "Clearance Resets",
    "Markdown Management",
    "Gold Label Merchandising",
    "Window Displays",
    "Lovelist Click & Collect",
    "Returns & Refunds",
    "Training & Coaching",
    "First Aid",
    "Treasure Rewards Sign-ups",
  ]

  const employees = []

  for (let i = 0; i < 30; i++) {
    const dept = departments[i % 5]
    const skills = faker.helpers.arrayElements(skillPool, { min: 3, max: 5 })

    employees.push({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatar: `https://avatars.githubusercontent.com/u/${faker.number.int({ min: 1000, max: 99999 })}`,
      department: dept.slug,
      role: faker.helpers.arrayElement(rolePool),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      joinDate: faker.date.past({ years: 5 }).toISOString(),
      skills,
    })

    dept.employeeCount++
  }

  return { departments, employees }
}

const { departments: DEPARTMENTS, employees: EMPLOYEES } = generateData()

export async function getEmployees(department?: string): Promise<Employee[]> {
  console.info(
    `[API] Fetching employees${department ? ` for department: ${department}` : ""} (250ms delay)`,
  )

  await delay(250)

  if (department) {
    return EMPLOYEES.filter(emp => emp.department === department)
  }

  return EMPLOYEES
}

export async function getDepartments(): Promise<Department[]> {
  console.info("[API] Fetching departments (100ms delay)")

  await delay(100)

  return DEPARTMENTS
}
