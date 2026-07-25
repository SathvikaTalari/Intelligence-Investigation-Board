import type { Case, Evidence, Person, TimelineEvent, Priority, Status } from '../types';
import { addDays, subDays } from 'date-fns';

const today = new Date();

export const generateMockCases = (count: number): Case[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `CASE-${1000 + i}`,
    title: `Operation ${['Blackwood', 'Midnight', 'Crimson', 'Shadow', 'Phoenix'][i % 5]} ${i}`,
    description: 'A classified investigation involving multiple suspects and complex evidence trails.',
    assignedTo: `Det. ${['Rathore', 'Iyer', 'Malhotra', 'Singh', 'Sharma'][i % 5]}`,
    priority: ['Low', 'Medium', 'High', 'Critical'][i % 4] as Priority,
    status: ['Open', 'In Progress', 'Under Review', 'Closed', 'Cold'][i % 5] as Status,
    openDate: subDays(today, Math.floor(Math.random() * 100)).toISOString(),
    lastUpdated: subDays(today, Math.floor(Math.random() * 5)).toISOString(),
    progress: Math.floor(Math.random() * 100),
    tags: ['Classified', 'Homicide', 'Theft', 'Fraud'].sort(() => 0.5 - Math.random()).slice(0, 2),
  }));
};

export const generateMockEvidence = (count: number, caseIds: string[]): Evidence[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `EVID-${5000 + i}`,
    caseId: caseIds[Math.floor(Math.random() * caseIds.length)],
    title: `${['Fingerprint', 'Weapon', 'Document', 'Photograph', 'Audio Log'][i % 5]} from Scene`,
    type: ['Document', 'Photo', 'Physical', 'Digital', 'Audio'][i % 5] as any,
    description: 'Recovered from the primary crime scene. Awaiting further forensic analysis.',
    dateFound: subDays(today, Math.floor(Math.random() * 60)).toISOString(),
    foundBy: `Officer ${['Smith', 'Doe', 'Brown', 'Davis'][i % 4]}`,
    location: `${['Warehouse District', 'Downtown', 'Docks', 'Suburbs'][i % 4]}`,
    imageUrl: i % 2 === 0 ? `https://picsum.photos/seed/${i}/400/300` : undefined,
    tags: ['Forensics', 'Pending', 'Critical'].sort(() => 0.5 - Math.random()).slice(0, 2),
  }));
};

export const generateMockPeople = (count: number, caseIds: string[]): Person[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `PERS-${9000 + i}`,
    name: `${['John', 'Jane', 'Michael', 'Sarah', 'David'][i % 5]} ${['Doe', 'Smith', 'Blackwood', 'Winters', 'Moriarty'][i % 5]}`,
    role: ['Suspect', 'Witness', 'Victim', 'Person of Interest'][i % 4] as any,
    caseIds: [caseIds[Math.floor(Math.random() * caseIds.length)]],
    notes: 'Last seen near the loading dock. Has a history of financial fraud.',
    imageUrl: `https://i.pravatar.cc/150?u=${i}`,
    lastSeen: subDays(today, Math.floor(Math.random() * 30)).toISOString(),
    riskScore: Math.floor(Math.random() * 100),
  }));
};

export const mockCases = generateMockCases(25);
export const mockEvidence = generateMockEvidence(100, mockCases.map(c => c.id));
export const mockPeople = generateMockPeople(50, mockCases.map(c => c.id));
