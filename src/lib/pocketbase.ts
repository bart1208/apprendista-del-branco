import PocketBase from 'pocketbase';

const pbUrl = process.env.NEXT_PUBLIC_POCKETBASE_URL || 'https://pb.fenrir.it';

export const pb = new PocketBase(pbUrl);

// Disable auto-cancellation for frequent requests (like rapid dashboard updates)
pb.autoCancellation(false);

export interface Mission {
    id: string;
    titolo: string;
    descrizione: string;
    tipo: 'logica' | 'reale' | 'storia';
    completata: boolean;
    created: string;
    updated: string;
}

export const getMissions = async (): Promise<Mission[]> => {
    try {
        return await pb.collection('missioni').getFullList<Mission>({
            sort: '-created',
        });
    } catch (error) {
        console.error('Error fetching missions:', error);
        return [];
    }
};
