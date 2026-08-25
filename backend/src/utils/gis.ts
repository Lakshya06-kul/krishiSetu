import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findNearestMarkets = async (lat: number, lng: number, radiusKm: number = 50) => {
  // Convert radius to meters for ST_DWithin
  const radiusMeters = radiusKm * 1000;
  
  // Use raw query for PostGIS
  const markets = await prisma.$queryRaw`
    SELECT id, name, district, state,
           ST_Distance(location, ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)) as distance
    FROM "MARKETS"
    WHERE ST_DWithin(
      location,
      ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
      ${radiusMeters}
    )
    ORDER BY distance ASC;
  `;
  
  return markets;
};
