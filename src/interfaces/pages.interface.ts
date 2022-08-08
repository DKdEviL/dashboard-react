export default interface HomePageProps {
    name: string;
}

export interface UserInterfaceProps {
    displayName: string;
    photoURL: string;
    email?:string;
}

export interface IStats {
    jobs_applied: number;
    mentorship_sessions: number;
    profile_views: number;
    skills_verified: number;
}

export interface IJobPost {
    date_posted: string;
    location: string;
    organization_name: string;
    role: string;
}

export interface ISession {
    date: string;
    mentor_name: string;
    session_type: string;
    timings: string;
}

export interface IDashbaordData {
    full_name: string;
    dashboard_stats: IStats;
    job_postings: Array<IJobPost>;
    upcoming_sessions: Array<ISession>
}
