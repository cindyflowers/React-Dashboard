function GetLogs(Date){

    var BatData = new [];
    // var connStr = new ConnectionStringBuilder()
    // .setNamespaceName('GigaTrust.servicebus.windows.net')
    // .setEventHubName('Default')
    // .setSasKeyName('Receiver') //"pT1BRTZ+KYfkFEDp9HUKHmBPL3mfvgyYYLn1ximyyLw="
    // .setSasKey('pT1BRTZ+KYfkFEDp9HUKHmBPL3mfvgyYYLn1ximyyLw=');  //"u2AJoEFJuQjUtZxcr6qLWMpDWFeCGMQS6t9Rf2EUkas="

    var connStr2 = 'Endpoint=sb://gigatrust.servicebus.windows.net/;SharedAccessKeyName=Receiver;SharedAccessKey=pT1BRTZ+KYfkFEDp9HUKHmBPL3mfvgyYYLn1ximyyLw=';

    var executorService = Executors.newScheduledThreadPool(4);
    var ehClient = EventHubClient.createFromConnectionStringSync(connStr2.toString(), executorService);

    var eventHubInfo = ehClient.getRuntimeInformation().get();
    var partitionId = eventHubInfo.getPartitionIds()[0];

    var receiver = ehClient.createEpochReceiverSync(
            EventHubClient.DEFAULT_CONSUMER_GROUP_NAME,
            partitionId,
            EventPosition.fromEnqueuedTime(Instant.EPOCH),
            2345);

    try {
        var receivedCount = 0;
        while (receivedCount++ < 100) {
            receiver.receive(100)
                    .thenAcceptAsync(receivedEvents => {
                        var batchSize = 0;
                        if (receivedEvents != null) {
                            while (batchSize != 100) {
                                //System.out.print(String.format("Offset: %s, SeqNo: %s, EnqueueTime: %s",
                                        //receivedEvent.getSystemProperties().getOffset(),
                                        //receivedEvent.getSystemProperties().getSequenceNumber(),
                                        //receivedEvent.getSystemProperties().getEnqueuedTime()));
                                //if (receivedEvent.getBytes() != null)
                                    //System.out.println(String.format("| Message Payload: %s", new String(receivedEvent.getBytes(), Charset.defaultCharset())));
                                var event = receivedEvents.receivedEvent;
                                BatData.push(event.getSystemProperties().getSequenceNumber());
                                batchSize++;
                            }
                        }
                    }, executorService).get();
        }
    } catch(EventHubException) {
        throw EventHubException();
    } finally {
        receiver.close()
                .thenComposeAsync(aVoid => ehClient.close(), executorService)
                .whenCompleteAsync((t, u) => {
                    if (u != null) {
                        // wire-up this error to diagnostics infrastructure
                        System.out.println(String.format("closing failed with error: %s", u.toString()));
                    }
                }, executorService).get();
        executorService.shutdown();
    }
}
