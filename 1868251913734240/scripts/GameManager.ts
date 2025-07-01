import * as hz from 'horizon/core';

class GameManager extends hz.Component<typeof GameManager> {
  static propsDefinition = {};

  //ゲームステート
  private gameState!: GameState;

  start() {
    //ゲームステート初期設定
    this.setGameState(GameState.Ready);

  }


  //ステート変更
  public setGameState(state: GameState): void {
    if(this.gameState == state){
      return;
    }

    switch(state){
      case GameState.Ready:
        if(this.gameState !== GameState.Playing){
          this.gameState = GameState.Ready;
        }
        break;
      
      case GameState.Playing:
        if(this.gameState === GameState.Ready){
          this.gameState = GameState.Playing;
        }
        break;

      case GameState.Finished:
        this.gameState = GameState.Finished;
        break;
    }

    console.log(`ChangeState ${this.gameState}`);
  }
}

hz.Component.register(GameManager);

export enum GameState{
  'Ready',
  'Playing',
  'Finished',
}