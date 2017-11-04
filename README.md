## PWA Client

- Hosting on github
- Useable without login

```
# Build container image
$ docker build -t gcr.io/${PROJECT_ID}/instantboardapp:v1.0.0 .

# Upload docker image to container registory
$ gcloud docker -- push gcr.io/${PROJECT_ID}/instantboardapp:v1.0.0
```

Refs
- [Hello Node example](https://github.com/GoogleCloudPlatform/container-engine-samples/tree/master/hellonode)
- [コンテナ化されたアプリケーションのデプロイ](https://cloud.google.com/container-engine/docs/tutorials/hello-node?hl=ja)
- [Container Engine 開始方法](https://cloud.google.com/container-engine/docs/before-you-begin?hl=ja)
- [単一のポッドを使用した WordPress の実行](https://cloud.google.com/container-engine/docs/tutorials/hello-wordpress?hl=ja)
- [ノードプールの概要](https://cloud.google.com/container-engine/docs/node-pools?hl=ja)
- [RailsアプリをGoogle Container Engineで動かす](https://qiita.com/esplo/items/76a1ecaf09843c49cfaf#docker-image%E3%81%AEpush)
- [コンテナに外部からアクセス（ポートフォワード）](https://qiita.com/tifa2chan/items/a58e34019d4f10097a4d)
- [Stop / remove all Docker containers](https://coderwall.com/p/ewk0mq/stop-remove-all-docker-containers)
- [Google Container Engineで五目並べアプリのAPIサーバーを作るデモ](http://enakai00.hatenablog.com/entry/2016/08/10/152334)
