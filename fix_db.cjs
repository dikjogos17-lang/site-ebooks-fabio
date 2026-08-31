const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixDb() {
  try {
    // Delete the completely corrupted one
    await prisma.ebook.delete({
      where: { id: 'c2554716-9555-463c-a741-1c5a3c1f9f1a' }
    });
    console.log('Deleted corrupted ebook.');
  } catch (e) {
    console.log('Could not delete (maybe already gone).');
  }

  try {
    // Update the trailing metadata one
    const ebookToFix = await prisma.ebook.findUnique({
      where: { id: '5084e018-b567-4226-b372-93703c61e903' }
    });
    if (ebookToFix && ebookToFix.fullDescription) {
      const cutoffIndex = ebookToFix.fullDescription.indexOf('</USER_REQUEST>');
      if (cutoffIndex !== -1) {
        await prisma.ebook.update({
          where: { id: '5084e018-b567-4226-b372-93703c61e903' },
          data: {
            fullDescription: ebookToFix.fullDescription.substring(0, cutoffIndex).trim()
          }
        });
        console.log('Fixed trailing metadata on real ebook.');
      }
    }
  } catch (e) {
    console.log('Error updating real ebook', e);
  }

  await prisma.$disconnect();
}

fixDb();
