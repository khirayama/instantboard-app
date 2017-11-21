## PWA Client

- [ ] Support http/2
- [ ] Migrate Google Cloud Platform
- [x] Integrate Container and page
- [x] Refactor presentational components

```
# Build container image
$ docker build -t gcr.io/${PROJECT_ID}/instantboardapp:v1.0.0 .

# Upload docker image to container registory
$ gcloud docker -- push gcr.io/${PROJECT_ID}/instantboardapp:v1.0.0

$ gcloud container clusters create instantboard-cluster
$ kubectl config current-context
$ kubectl create -f deployment.yml
$ kubectl create -f service.yml

# For free
$ gcloud container clusters create --zone=us-central1-a --machine-type=f1-micro --disk-size=30 --num-nodes=3 instantboard-cluster
$ gcloud container clusters resize instantboard-cluster --zone=us-central1-a --size=1
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
