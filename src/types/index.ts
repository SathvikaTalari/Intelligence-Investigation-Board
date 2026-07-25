export type Priority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Status = 'Open' | 'In Progress' | 'Under Review' | 'Closed' | 'Cold';

export interface Case {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: Priority;
  status: Status;
  openDate: string;
  lastUpdated: string;
  progress: number;
  tags: string[];
}

export interface Evidence {
  id: string;
  caseId: string;
  title: string;
  type: 'Document' | 'Photo' | 'Physical' | 'Digital' | 'Audio';
  description: string;
  dateFound: string;
  foundBy: string;
  location: string;
  imageUrl?: string;
  tags: string[];
}

export interface Person {
  id: string;
  name: string;
  role: 'Suspect' | 'Witness' | 'Victim' | 'Person of Interest';
  caseIds: string[];
  notes: string;
  imageUrl?: string;
  lastSeen?: string;
  riskScore?: number;
}

export interface TimelineEvent {
  id: string;
  caseId: string;
  date: string;
  title: string;
  description: string;
  type: 'Incident' | 'Evidence Found' | 'Interview' | 'Arrest' | 'Note';
}

export interface BoardItem {
  id: string;
  type: 'evidence' | 'person' | 'note';
  refId?: string; // id of evidence or person
  content?: string; // if note
  x: number;
  y: number;
}

export interface BoardConnection {
  id: string;
  sourceId: string;
  targetId: string;
  label?: string;
}
