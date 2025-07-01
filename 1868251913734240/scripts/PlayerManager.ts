import * as hz from 'horizon/core';

class PlayerManager extends hz.Component<typeof PlayerManager>
{
  static propsDefinition = {};

  //マップに存在するプレイヤーを取得して格納
  private playerMap: Map<number, hz.Player> = new Map<number, hz.Player>();


  start()
  {
    //プレイヤー入室を検知してMapを更新する
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerEnterWorld,
      (player: hz.Player) =>{
        this.handleOnPlayerEnter(player);
      },
    );

    //プレイヤー退出を検知してMapを更新する
    this.connectCodeBlockEvent(
      this.entity,
      hz.CodeBlockEvents.OnPlayerExitWorld,
      (player: hz.Player) =>{
        this.handleOnPlayerExit(player);
      },
    );
  }

  //プレイヤー入室ハンドラ
  private handleOnPlayerEnter(player: hz.Player): void{
    if(!this.playerMap.has(player.id)){
      this.playerMap.set(player.id, player);
      console.log(`Added Player: ${player.name.get()}`);
    }
  }

  //プレイヤー退出ハンドラ
  private handleOnPlayerExit(player: hz.Player): void{
    if(this.playerMap.has(player.id)){
      this.playerMap.set(player.id, player);
      console.log(`Deleted Player: ${player.name.get()}`);
    }
  }
}
hz.Component.register(PlayerManager);