import { PrismaClient, TaskStatus } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

// Random data generators
const titles = [
  "Complete project documentation",
  "Review pull requests",
  "Update API endpoints",
  "Fix production bugs",
  "Implement new feature",
  "Write unit tests",
  "Deploy to staging",
  "Database optimization",
  "Code review session",
  "Team meeting preparation",
  "Refactor legacy code",
  "Security audit",
  "Performance testing",
  "Update dependencies",
  "Create user documentation",
];

const descriptions = [
  "High priority task that needs immediate attention",
  "Regular maintenance and cleanup work",
  "Research and implement best practices",
  "Collaborate with team members on this initiative",
  "Update documentation and add examples",
  "Performance improvements and optimization",
  "Bug fixes and error handling",
  "Feature enhancement based on user feedback",
  "Standard task requiring completion",
  "Critical issue affecting production",
  "Minor improvements to existing functionality",
  "Scheduled maintenance window required",
];

const statuses: TaskStatus[] = [
  TaskStatus.PENDING,
  TaskStatus.IN_PROGRESS,
  TaskStatus.COMPLETED,
];

// Helper functions
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDate(daysAgo: number): Date {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);

  now.setDate(now.getDate() - randomDays);
  now.setHours(now.getHours() - randomHours);
  now.setMinutes(now.getMinutes() - randomMinutes);

  return now;
}

async function seedTasks() {
  try {
    // Check if user with id 1 exists
    const user = await prisma.user.findUnique({
      where: { id: 1 },
    });

    if (!user) {
      console.error("User with id 1 not found. Please create a user first.");
      process.exit(1);
    }

    // Create 50 random tasks
    const tasks = [];
    for (let i = 1; i <= 50; i++) {
      const createdAt = getRandomDate(30); // Within last 30 days
      const updatedAt = new Date(
        createdAt.getTime() + Math.random() * (Date.now() - createdAt.getTime())
      ); // Between createdAt and now

      const title = `${getRandomElement(titles)} #${i}`;
      const description = getRandomElement(descriptions);
      const status = getRandomElement(statuses);

      tasks.push({
        title,
        description,
        status,
        userId: 2,
        createdAt,
        updatedAt,
      });
    }

    // Insert tasks in batches
    const batchSize = 10;
    let created = 0;

    for (let i = 0; i < tasks.length; i += batchSize) {
      const batch = tasks.slice(i, i + batchSize);

      await prisma.task.createMany({
        data: batch,
      });

      created += batch.length;
    }
  } catch (error) {
    console.error("Error seeding tasks:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedTasks()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
