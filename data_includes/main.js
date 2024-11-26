PennController.ResetPrefix(null)

newTrial("BrowserWarning",
    defaultText
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("REMINDER!")
    .css("font-size", "36px")
    ,
    newText("This experiment <i><b>will not load</b></i> on a tablet or mobile device. Use Chrome or Firefox!")
    ,
    newButton("Proceed", "Proceed")
    .center()
    .print()
    .wait()
    );

newTrial("Consent",
    defaultText
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .center()
    .print()
    ,
    newHtml("NounNumb_Gesture.html")
    .print()
    ,
    newText("EnterID", "<b>By entering your Prolific ID below</b>, you indicate that you have read the form explaining the research and have been told whom to contact if you have questions about the research. You also agree to participate in the research study described above.")
    .print()
    ,
    newTextInput("ProlificID")
    .center()
    .print()
    .log()
    ,
    newButton("Agree","I agree")
    .center()
    .print()
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .wait()
    ,
    clear()
    ,
    newText("CheckConsent", "Check the boxes below to indicate your consent for the following. If you want to participate without granting any/all the permissions below, you should feel free to do so.")
    .css("font-size", "24px")
    ,
    newScale("Presentations", "I agree to allow the researchers to show images or videos of me to in published articles or in public presentations.")
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .checkbox()
    .vertical()
    .print()
    .log()
    ,
    newScale("FutureResearch", "I agree to allow the researchers to show images or videos of me to other participants in similar future research.")
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .checkbox()
    .vertical()
    .print()
    .log()
    ,
    newScale("TV", "I agree to allow the researchers to show images or videos of me on the internet and/or on television for educational or research purposes.")
    .cssContainer({"margin-bottom":"1em", "margin-top":"1em"})
    .css("font-size", "18px")
    .checkbox()
    .vertical()
    .print()
    .log()
    ,
    newButton("Continue1", "Continue")
    .center()
    .print()
    .wait()
    ,
    newVar("ParticipantID").global()
    .set(getTextInput("ProlificID"))
  )
    

InitiateRecorder("https://mondo1.dreamhosters.com/AudioRecordings/audiouploads.php")
    .label("InitiateRecorder");

Template("NounNumb_TrialOrder.csv", row =>
    newTrial("TestPhase",
        newCanvas("Gesture", 1200, 550)
            .center()
            .add( 0,25, newImage("StimImage",row.StimFilename).size(500,500) )
            .add( 550,25, newMediaRecorder(getVar("ParticipantID")+"_"+row.ItemID)
                            .once()
                            .log()
                            .record())
            .print()
            ,
        newButton("Next")
        .center()
        .css("font-size", "24px")
        .cssContainer({"margin-bottom":"1em"})
        .print()
        .wait()
    )
    .log("ParticipantID", getVar("ParticipantID"))
    .log("ItemID", row.ItemID)
    .log("ListID", row.group)
    .log("ConditionID", row.ConditionID)
    .log("StimFile", row.StimFilename)
)

newTrial("DebriefQuestions",
    defaultText
    .center()
    .css("font-size", "24px")
    .cssContainer({"margin-bottom":"1em"})
    .print()
    ,
    newText("Did you have any strategies for doing the experiment?")
    ,
    newTextInput("Strategies")
        .length(45)
        .lines(5)
        .center()
        .print()
        .log()
        .cssContainer({"margin-bottom":"1em"})
    ,
    newText("Comments", "Feel free to enter any other comments in the box below:")
    ,
    newTextInput("CommentBox")
        .length(45)
        .lines(5)
        .center()
        .print()
        .log()
        .cssContainer({"margin-bottom":"1em"})
    ,
    newButton("End Experiment")
        .center()
        .css("font-size", "24px")
        .cssContainer({"margin-bottom":"1em"})
        .print()
        .wait()
    ).log("ParticipantID", getVar("ParticipantID"));
    
SendResults();

newTrial("EndScreen",
    newText("<p><a href='https://app.prolific.co/submissions/complete?cc=3A9135BA'>Click here to validate your submission on Prolific</a></p>")
        .center()
        .print()
    ,
    newButton("void")
        .wait()
).setOption("hideProgressBar",true);

