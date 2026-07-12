import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../utils/firebase';

const LEADERBOARD_COLLECTION = 'leaderboard';

export const saveScore = async (scoreData) => {
  try {
    const docRef = await addDoc(collection(db, LEADERBOARD_COLLECTION), {
      ...scoreData,
      completedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving score:', error);
    return { success: false, error: error.message };
  }
};

export const getLeaderboard = async (quizId, limitCount = 10) => {
  try {
    const q = query(
      collection(db, LEADERBOARD_COLLECTION),
      where('quizId', '==', quizId),
      orderBy('score', 'desc'),
      orderBy('completedAt', 'desc'),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const leaderboard = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return { success: true, data: leaderboard };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return { success: false, error: error.message, data: [] };
  }
};
