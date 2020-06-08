// @flow

import { pool } from './mysql_pool';

class ScoreService {
  getScores(success: (number[]) => mixed) {
    pool.query('SELECT * FROM Scores', (error, result) => {
      if (error) return console.error(error);

      success(result);
    });
  }

  updateScore(id: number, points: number, success: () => mixed) {
    pool.query('UPDATE Scores set score=? where id=?', [points, id], (error, result) => {
      if (error) return console.error(error);

      success();
    });
  }

  resetScores(success: () => mixed) {
    pool.query('UPDATE Scores set score=0', (error, result) => {
      if (error) return console.error(error);

      success();
    });
  }
}
export let scoreService = new ScoreService();
