import axios from 'axios';
import swal from 'sweetalert';
import { FETCH_QUESTIONS, saveQuestions, fetchQuestions, FETCH_POST_QUESTION, FETCH_QUESTION_SCORE } from 'src/actions/questions';

const ajaxQuestionMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    // + on traduit l'intention en intérrogeant notre API
    // je vais avoir besoin de lire le state pour faire ma requete
    case FETCH_QUESTIONS: {
      const state = store.getState();
      axios.get(`http://localhost:3000/question/${state.questions.sorted}`)
        .then((response) => {
          // quand on a la réponse, on veut modifier le pseudo dans l'état
          // je vais vouloir émettre une intention pour modifier le state
          store.dispatch(saveQuestions(response.data.questions));
        })
        .catch((error) => {
          console.error(error);
        });
      // je laisse passer tout de suite au middleware/reducer suivant
      next(action);
      break;
    }
    case FETCH_POST_QUESTION: {
      const state = store.getState();
      axios.post('http://localhost:3000/question', {
        content: state.questions.content,
        tagId: state.questions.tagId,
      }, { withCredentials: true })
        .then((response) => {
          // revenir a la fenetre précédente
          if (response.data.error) {
            swal(response.data.error, '', 'warning');
          }
          else {
            store.dispatch(fetchQuestions());
            swal('Question postée!', '', 'success');
          }
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }
    case FETCH_QUESTION_SCORE: {
      const state = store.getState();
      const { vote, votedQuestionId } = state.questions;
      axios.patch(`http://localhost:3000/question/${votedQuestionId}/${vote}`, {
      }, {
        withCredentials: true,
      })
        .then((response) => {
          // revenir a la fenetre précédente
          if (response.data.error) {
            swal(response.data.error, '', 'warning');
          }
          else {
            store.dispatch(fetchQuestions());
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
      next(action);
      break;
    }
    default:
      next(action);
  }
};

export default ajaxQuestionMiddleware;
