const STORAGE_KEY = "kettlebell-workout-system-v1";
const LEVELS = [8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48];

const CLASSES = [
  {
    name: "Foundation",
    range: "8-16kg",
    min: 8,
    max: 16,
    description: "Build clean movement, repeatable sessions, and the base that makes heavier bells feel earned."
  },
  {
    name: "Builder",
    range: "20-24kg",
    min: 20,
    max: 24,
    description: "The work starts to feel real here: full-body strength, conditioning, and weekly consistency."
  },
  {
    name: "Power",
    range: "28-32kg",
    min: 28,
    max: 32,
    description: "Heavy enough to demand intent. Progress is slower, cleaner, and more deliberate."
  },
  {
    name: "Master",
    range: "36-40kg",
    min: 36,
    max: 40,
    description: "Advanced territory. The map gets quieter because every session has to count."
  },
  {
    name: "Summit",
    range: "44-48kg",
    min: 44,
    max: 48,
    description: "The endgame ladder. Not many steps, but each one asks for serious ownership."
  }
];

const workoutLabels = {
  max_level_full_body: {
    title: "Max Level Full Body",
    short: "MAX",
    badge: "max"
  },
  medium_kettlebell: {
    title: "Medium Kettlebell",
    short: "MED",
    badge: "medium"
  },
  other: {
    title: "Other Workout",
    short: "OTH",
    badge: "other"
  }
};

const statusLabels = {
  conquered: "Conquered",
  active: "Active",
  unlocked: "Unlocked",
  locked: "Locked"
};

const SYSTEM_LESSONS = [
  {
    id: "01",
    module: "Foundations",
    title: "What This System Is",
    eyebrow: "Start here",
    summary: "Αν δεν ξέρεις τίποτα, ξεκινάς εδώ: τι κάνουμε, γιατί το κάνουμε και πώς μετράμε πρόοδο.",
    rule: "Ένα απλό σύστημα πρέπει να σου λέει τι να κάνεις, γιατί το κάνεις και πότε προχωράς.",
    practice: "Μετά από αυτό το μάθημα πρέπει να μπορείς να εξηγήσεις το σύστημα σε μία πρόταση: λίγες βασικές κινήσεις, καθαρή τεχνική, μετρήσιμη πρόοδος, επόμενο βάρος μόνο όταν κερδηθεί.",
    art: "philosophy",
    body: [
      {
        heading: "Το πρόβλημα που λύνουμε",
        paragraphs: [
          "Αν είσαι νέος στην προπόνηση με kettlebell, το πρώτο πρόβλημα δεν είναι ότι δεν έχεις αρκετές ασκήσεις. Είναι ότι έχεις πάρα πολλές επιλογές χωρίς σύστημα. Βλέπεις swings, cleans, snatches, presses, squats, flows, complexes, challenges, EMOMs, circuits. Όλα φαίνονται χρήσιμα, αλλά δεν ξέρεις τι είναι βάση, τι είναι εξέλιξη και τι είναι απλώς θόρυβος.",
          "Αυτό το course φτιάχνει σειρά. Δεν σου λέει απλώς κάνε kettlebell. Σου εξηγεί ποια είναι η βάση, τι χτίζει κάθε κίνηση, πώς βάζεις προπόνηση χωρίς να γεμίσει σαβούρα, και πώς ξέρεις ότι είσαι έτοιμος για πιο δύσκολο βάρος ή πιο δύσκολο test."
        ]
      },
      {
        heading: "Η κεντρική ιδέα",
        paragraphs: [
          "Το σύστημα βασίζεται σε λίγες κινήσεις υψηλής απόδοσης. Αυτό δεν σημαίνει ότι κάνεις λίγα επειδή βαριέσαι ή επειδή το πρόγραμμα είναι φτωχό. Σημαίνει ότι επιλέγεις κινήσεις που χτυπάνε πολλά πράγματα μαζί: δύναμη, αντοχή, ισχύ, κορμό, λαβή, αναπνοή, κινητικότητα και ψυχραιμία.",
          "Το kettlebell είναι ιδανικό για αυτό γιατί δεν σε βάζει μόνο να σηκώνεις βάρος. Σε βάζει να μεταφέρεις δύναμη μέσα από όλο το σώμα. Κάποιες κινήσεις είναι εκρηκτικές, κάποιες είναι αργές και ελεγχόμενες, κάποιες ενώνουν τα δύο. Όταν αυτές μπουν σε απλό σύστημα, ένα kettlebell μπορεί να γίνει ολόκληρο γυμναστήριο."
        ]
      },
      {
        heading: "Πώς θα προχωράς",
        paragraphs: [
          "Δεν θα προχωράς επειδή βαρέθηκες το παλιό πρόγραμμα. Δεν θα προχωράς επειδή μια μέρα ένιωσες δυνατός. Θα προχωράς επειδή έχεις απόδειξη. Η απόδειξη μπορεί να είναι καθαρή τεχνική, περισσότερη δουλειά στον ίδιο χρόνο, ίδιο test περασμένο ξανά, ή ένα benchmark που δείχνει ότι το σώμα έχει πραγματικά προσαρμοστεί.",
          "Γι' αυτό το course συνδέεται με το language της εφαρμογής: locked, unlocked, conquered. Το επόμενο βάρος δεν είναι απλώς διαθέσιμο επειδή υπάρχει. Ξεκλειδώνει όταν το προηγούμενο έχει κατακτηθεί."
        ]
      }
    ]
  },
  {
    id: "02",
    module: "Foundations",
    title: "Why One Kettlebell Works",
    eyebrow: "Training logic",
    summary: "Πριν μάθεις ασκήσεις, πρέπει να καταλάβεις γιατί ένα kettlebell μπορεί να χτίσει τόσα πολλά qualities μαζί.",
    rule: "Το kettlebell δεν απομονώνει απλώς μυς. Μαθαίνει το σώμα να δουλεύει σαν μονάδα.",
    practice: "Όταν βλέπεις μια kettlebell κίνηση, ρώτα: ποια qualities εκπαιδεύει ταυτόχρονα; Δύναμη, αντοχή, λαβή, κορμό, αναπνοή, κινητικότητα ή συντονισμό;",
    art: "performance",
    body: [
      {
        heading: "Weighted locomotion",
        paragraphs: [
          "Ένας καλός τρόπος να δεις το kettlebell training είναι σαν loaded movement ή weighted locomotion. Δεν κάθεσαι σε μηχάνημα για να κινήσεις ένα μόνο joint. Κρατάς ένα εξωτερικό βάρος και το σώμα πρέπει να οργανωθεί γύρω του: πόδια, γοφοί, κορμός, ώμοι, λαβή, αναπνοή.",
          "Γι' αυτό μια κίνηση μπορεί να σηκώσει πολλά qualities μαζί. Ένα swing μπορεί να είναι power και conditioning. Ένα squat-to-press μπορεί να είναι legs, shoulders, core και cardio. Ένα carry μπορεί να είναι grip, posture, trunk stability και breathing practice."
        ]
      },
      {
        heading: "Ballistics, grinds και hybrids",
        paragraphs: [
          "Υπάρχουν τρεις μεγάλες κατηγορίες που πρέπει να καταλάβεις. Ballistic κινήσεις είναι εκρηκτικές: swing, clean, snatch, jerk. Εκεί η δύναμη έρχεται από πόδια, γοφούς και κορμό και το kettlebell ταξιδεύει.",
          "Grind κινήσεις είναι πιο αργές και ελεγχόμενες: deadlift, press, squat. Εκεί χτίζεις θέση, τάση, bracing και strength. Hybrid κινήσεις, όπως το squat-to-press ή thruster, ενώνουν τα δύο. Αν δεν ξέρεις ποια ποιότητα δουλεύεις, εύκολα κάνεις όλα τα reps ίδια και χάνεις το νόημα."
        ]
      },
      {
        heading: "Γιατί πρώτα ένα kettlebell",
        paragraphs: [
          "Το μονό kettlebell είναι αρκετό για πολύ καιρό γιατί σε αναγκάζει να μάθεις πλευρές. Δεξί και αριστερό δεν είναι πάντα ίδια. Το μονόπλευρο φορτίο εκθέτει ασυμμετρίες, ζητάει κορμό και σε μαθαίνει να σταθεροποιείς χωρίς να κρύβεσαι πίσω από συμμετρικό βάρος.",
          "Τα δύο kettlebells μπορούν να γίνουν πολύ δυνατά αργότερα, αλλά διπλασιάζουν την απαίτηση. Αν δεν έχεις θέση, αναπνοή και τεχνική με ένα bell, τα δύο δεν σε κάνουν πιο advanced. Απλώς κάνουν το λάθος πιο βαρύ."
        ]
      }
    ]
  },
  {
    id: "03",
    module: "Base Movements",
    title: "The Three-Move Base",
    eyebrow: "Your foundation",
    summary: "Η βάση του συστήματος: swing, single-arm squat-to-press και suitcase deadlift.",
    rule: "Η βάση πρέπει να καλύπτει engine, bridge και structure.",
    practice: "Μάθε να αναγνωρίζεις τον ρόλο κάθε κίνησης: swing για engine, squat-to-press για bridge, suitcase deadlift για loaded structure.",
    art: "triad",
    body: [
      {
        heading: "Τρεις κινήσεις, τρεις ρόλοι",
        paragraphs: [
          "Η βάση μας έχει τρεις κινήσεις. Το swing είναι η μηχανή. Χτίζει hip power, posterior chain, conditioning, grip, ρυθμό και αναπνοή. Το single-arm squat-to-press είναι η γέφυρα. Ενώνει πόδια, rack, press, κορμό και μονόπλευρη σταθερότητα. Το suitcase deadlift είναι η δομή. Σε μαθαίνει να σηκώνεις βάρος από το πλάι χωρίς να λυγίζεις προς αυτό.",
          "Αν είσαι αρχάριος, ίσως αναρωτηθείς: μα είναι αρκετά αυτά; Η απάντηση είναι ότι είναι αρκετά για να χτίσουν βάση, όχι απαραίτητα για να εξαντλήσουν όλη τη γνώση. Άλλες κινήσεις θα μπουν αργότερα, αλλά πρώτα πρέπει να καταλάβεις αυτές."
        ]
      },
      {
        heading: "Τι καλύπτουν",
        paragraphs: [
          "Με αυτές τις τρεις κινήσεις έχεις hinge, squat, press, grip, core bracing, unilateral loading, breath under load και conditioning. Δεν είναι πλήρης εγκυκλοπαίδεια kettlebell. Είναι πρακτική βάση.",
          "Το νόημα δεν είναι να μην μάθεις ποτέ clean, snatch, carry, row ή mobility. Το νόημα είναι να ξέρεις ποια είναι η βάση σου ώστε κάθε νέα γνώση να κουμπώνει κάπου."
        ]
      },
      {
        heading: "Τι θα σε μπερδέψει στην αρχή",
        paragraphs: [
          "Μπορεί να μπερδευτείς επειδή κάποιες κινήσεις μοιάζουν μεταξύ τους. Το swing μοιάζει με deadlift αλλά δεν είναι αργό lift. Το squat-to-press μοιάζει με press αλλά ξεκινά από πόδια και rack. Το suitcase deadlift μοιάζει απλό αλλά είναι core test.",
          "Γι' αυτό τα επόμενα μαθήματα δεν σου δίνουν απλώς πρόγραμμα. Σου μαθαίνουν τι ψάχνεις σε κάθε κίνηση."
        ]
      }
    ]
  },
  {
    id: "04",
    module: "Base Movements",
    title: "The Hinge And The Swing",
    eyebrow: "Engine mechanics",
    summary: "Πριν κάνεις καλό swing πρέπει να καταλάβεις hinge, timing, arms, breath και common mistakes.",
    rule: "Το swing δεν σηκώνεται με χέρια. Εκτοξεύεται από γοφούς.",
    practice: "Αξιολόγησε το swing από 5 σημεία: hinge, neutral spine, relaxed arms, bell path στο κέντρο, και αναπνοή που δεν σπάει.",
    art: "swing",
    body: [
      {
        heading: "Deadlift, pendulum, swing",
        paragraphs: [
          "Για έναν αρχάριο, το swing μπερδεύει επειδή μοιάζει και με deadlift και με cardio. Η βάση του είναι hinge: οι γοφοί πάνε πίσω, η σπονδυλική στήλη μένει οργανωμένη, τα πόδια πατάνε στο πάτωμα. Αλλά το swing δεν είναι αργό deadlift. Είναι επαναλαμβανόμενη, εκρηκτική κίνηση.",
          "Σκέψου το σαν pendulum. Το kettlebell περνάει πίσω, το σώμα φορτώνει, οι γοφοί οδηγούν, και το bell ανεβαίνει επειδή το σώμα άνοιξε δυνατά. Τα χέρια δεν κάνουν raise. Τα χέρια είναι σύνδεσμος."
        ]
      },
      {
        heading: "Το late hinge",
        paragraphs: [
          "Ένα σημαντικό λάθος είναι να κάνεις hinge πολύ νωρίς στην πτώση. Αν πετάξεις τους γοφούς πίσω πριν έρθει το bell, κυνηγάς το βάρος και η μέση παίρνει περισσότερο stress. Θέλεις να περιμένεις το bell, να το δεχτείς, και μετά να κάνεις hinge.",
          "Άλλο λάθος είναι να κάνεις squat αντί για hinge. Στο squat τα γόνατα λυγίζουν πολύ και ο κορμός μένει πιο όρθιος. Στο swing θέλεις hip snap, όχι knee-dominant bobbing."
        ]
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Τα βασικά λάθη είναι: σηκώνεις με ώμους, λυγίζεις χέρια νωρίς, χάνεις το center line, σφίγγεις υπερβολικά τη λαβή, κρατάς την αναπνοή, ή πηγαίνεις πολύ γρήγορα πριν υπάρχει τεχνική.",
          "Το καλό swing νιώθει δυνατό αλλά όχι πανικόβλητο. Έχει ρυθμό. Έχει float στην κορυφή. Έχει καθαρό hinge στην επιστροφή. Και μπορεί να επαναληφθεί χωρίς κάθε rep να μοιάζει διαφορετικό."
        ]
      }
    ]
  },
  {
    id: "05",
    module: "Base Movements",
    title: "Rack, Squat-To-Press And Thruster",
    eyebrow: "Bridge mechanics",
    summary: "Η δεύτερη βασική κίνηση θέλει rack, squat, press line και ξεκάθαρο intent.",
    rule: "Πρώτα κατέχεις το rack. Μετά το squat. Μετά το press.",
    practice: "Πριν αυξήσεις reps, έλεγξε αν το rack είναι σταθερό, αν το squat δεν καταρρέει, και αν το press πηγαίνει κοντά και ευθεία.",
    art: "press",
    body: [
      {
        heading: "Τι είναι το rack",
        paragraphs: [
          "Το rack δεν είναι απλώς να κρατάς το kettlebell μπροστά σου. Είναι πλατφόρμα. Το bell κάθεται κοντά στο σώμα, ο αγκώνας μένει συνδεδεμένος, ο καρπός δεν καταρρέει, τα πλευρά και η λεκάνη μένουν οργανωμένα. Αν το rack είναι κακό, όλη η κίνηση κοστίζει περισσότερο.",
          "Αργότερα το clean γίνεται σημαντικό γιατί είναι ο καθαρός τρόπος να φέρεις το bell στο rack. Αλλά ακόμα κι αν ξεκινάς από assisted rack, πρέπει να μάθεις τι σημαίνει να ξεκουράζεται το bell πάνω στο σώμα αντί να το κρατάς μακριά με τον ώμο."
        ]
      },
      {
        heading: "Strict ή thruster",
        paragraphs: [
          "Υπάρχουν δύο βασικά intents. Στο strict squat-to-press κάνεις squat, στέκεσαι, σταθεροποιείς και πιέζεις. Αυτό είναι καλύτερο για καθαρή δύναμη και έλεγχο. Στο thruster, το ανέβασμα από το squat περνάει κατευθείαν στο press. Αυτό είναι πιο conditioning και full-body.",
          "Κανένα από τα δύο δεν είναι λάθος. Λάθος είναι να μην ξέρεις ποιο κάνεις. Αν όλα γίνουν γρήγορα πριν έχεις rack και press line, τότε απλώς χτίζεις κούραση πάνω σε κακή θέση."
        ]
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Συχνά λάθη: ο αγκώνας φεύγει μακριά από το σώμα, το squat γίνεται forward fold, τα γόνατα καταρρέουν μέσα, το press φεύγει μπροστά, ή το σώμα στρίβει προς το φορτίο.",
          "Η καλή rep τελειώνει stacked: πόδια στο πάτωμα, κορμός σταθερός, bell πάνω από το σώμα, όχι μπροστά από αυτό."
        ]
      }
    ]
  },
  {
    id: "06",
    module: "Base Movements",
    title: "Suitcase Deadlift, Carry And Bracing",
    eyebrow: "Loaded structure",
    summary: "Το suitcase deadlift διδάσκει πώς να σηκώνεις και να κρατάς βάρος χωρίς να χάνεις σχήμα.",
    rule: "Το σώμα δεν πρέπει να λυγίζει προς το βάρος.",
    practice: "Σε κάθε rep έλεγξε: ώμοι square, hinge καθαρό, bell κοντά, κατέβασμα ελεγχόμενο, δεξιά και αριστερά ίδια.",
    art: "deadlift",
    body: [
      {
        heading: "Γιατί δεν είναι απλώς beginner άσκηση",
        paragraphs: [
          "Το suitcase deadlift φαίνεται απλό. Το bell είναι στο πλάι, το πιάνεις και σηκώνεσαι. Αλλά το πλάι είναι ακριβώς το θέμα. Το βάρος θέλει να σε τραβήξει προς μία πλευρά. Ο κορμός πρέπει να αντισταθεί. Η λαβή πρέπει να κρατήσει. Οι γοφοί πρέπει να κάνουν hinge χωρίς twist.",
          "Αυτό το κάνει εξαιρετική βάση για πραγματική δύναμη. Δεν χρειάζεται overhead θέση, hand insertion ή γρήγορη πτώση. Μπορείς να μάθεις bracing και hinge χωρίς πολύπλοκο skill overhead."
        ]
      },
      {
        heading: "Η σύνδεση με carries",
        paragraphs: [
          "Όταν το suitcase deadlift γίνει καθαρό, ανοίγει φυσικά προς suitcase carry. Σηκώνεις το bell, στέκεσαι ψηλά, περπατάς χωρίς να γέρνεις. Αυτό είναι απλό αλλά πολύ δυνατό: grip, posture, κορμός, αναπνοή, αντοχή.",
          "Τα carries δεν είναι filler στο τέλος. Είναι τρόπος να δεις αν μπορείς να κρατήσεις δομή ενώ κινείσαι. Αν κάθε βήμα σε τραβάει στο πλάι, έχεις δουλειά να κάνεις."
        ]
      },
      {
        heading: "Common mistakes",
        paragraphs: [
          "Τα συχνά λάθη είναι να γέρνεις προς το bell, να στρίβεις για να το πιάσεις, να στρογγυλεύεις την πλάτη, να σηκώνεις τον ώμο της φορτωμένης πλευράς, ή να αφήνεις το bell να πέφτει χωρίς έλεγχο.",
          "Το cue είναι απλό: σήκωσε κάτι βαρύ χωρίς να αλλάξει το σχήμα σου."
        ]
      }
    ]
  },
  {
    id: "07",
    module: "Training Design",
    title: "How A Workout Is Built",
    eyebrow: "Workout recipe",
    summary: "Πώς χτίζεις προπόνηση με 3-4 κινήσεις χωρίς να λείπει κάτι σημαντικό.",
    rule: "Δεν γεμίζεις την προπόνηση. Της δίνεις ρόλους.",
    practice: "Κάθε workout πρέπει να έχει σκοπό: engine, strength, bridge, support ή recovery. Αν μια άσκηση δεν έχει ρόλο, δεν μπαίνει.",
    art: "recipe",
    body: [
      {
        heading: "Οι ρόλοι της προπόνησης",
        paragraphs: [
          "Ένα μικρό workout δεν σημαίνει πρόχειρο workout. Σημαίνει ότι κάθε κομμάτι έχει ρόλο. Engine είναι αυτό που ανεβάζει ρυθμό και conditioning, όπως swings. Strength/base είναι αυτό που χτίζει ελεγχόμενη δύναμη, όπως suitcase deadlift. Bridge είναι αυτό που ενώνει qualities, όπως squat-to-press.",
          "Το τέταρτο slot, αν υπάρχει, είναι support. Μπορεί να είναι push-ups, rows, pull-ups, carry ή mobility. Δεν μπαίνει επειδή πρέπει να κάνουμε κι άλλο. Μπαίνει επειδή λύνει συγκεκριμένο gap."
        ]
      },
      {
        heading: "Sets, circuits, EMOMs",
        paragraphs: [
          "Η ίδια τριάδα μπορεί να οργανωθεί με διαφορετικούς τρόπους. Μπορείς να κάνεις sets με ξεκούραση για δύναμη. Μπορείς να κάνεις circuit για πιο συνεχόμενη δουλειά. Μπορείς να κάνεις EMOM, δηλαδή κάθε λεπτό ένα καθαρό κομμάτι δουλειάς.",
          "Η διαφορά είναι το intent. Αν θες δύναμη, ξεκουράζεσαι αρκετά για καθαρές reps. Αν θες density, κρατάς χρόνο και επαναλαμβάνεις. Αν θες skill, μειώνεις ένταση και κρατάς τεχνική."
        ]
      },
      {
        heading: "Τι δεν κάνουμε",
        paragraphs: [
          "Δεν φτιάχνουμε άσκηση για κάθε μυ σαν checklist. Δεν προσθέτουμε curls, raises, random abs και άσχετα finishers απλώς για να γεμίσει η μέρα. Αυτό δεν σημαίνει ότι τέτοια πράγματα δεν έχουν ποτέ θέση. Σημαίνει ότι δεν είναι ο πυρήνας.",
          "Το καλό workout αφήνει καθαρή αίσθηση: ξέρω τι δούλεψα, γιατί το δούλεψα και τι θα μετρήσω την επόμενη φορά."
        ]
      }
    ]
  },
  {
    id: "08",
    module: "Training Design",
    title: "The Bigger Map",
    eyebrow: "Where new skills fit",
    summary: "Πού μπαίνουν clean, high pull, snatch, press, squat, row, push-up, mobility και γιατί δεν τα κάνουμε όλα από την αρχή.",
    rule: "Νέα γνώση μπαίνει όταν εξηγεί, βελτιώνει ή προετοιμάζει κάτι.",
    practice: "Όταν μαθαίνεις νέα κίνηση, σύνδεσέ τη με βάση: swing family, rack/press family, hinge/bracing family ή support.",
    art: "rings",
    body: [
      {
        heading: "Οι οικογένειες κινήσεων",
        paragraphs: [
          "Αν δεις όλες τις kettlebell κινήσεις μαζί, θα χαθείς. Αν τις δεις σαν οικογένειες, αρχίζουν να βγάζουν νόημα. Το swing ανοίγει σε high pull, clean και snatch. Το rack ανοίγει σε press, squat, thruster και jerk. Το deadlift ανοίγει σε carries, rows και πιο βαριά strength work.",
          "Αυτό σημαίνει ότι δεν χρειάζεται να μάθεις τα πάντα από την πρώτη μέρα. Χρειάζεται να ξέρεις ποια οικογένεια υπηρετεί η κάθε νέα κίνηση."
        ]
      },
      {
        heading: "Clean και hand insertion",
        paragraphs: [
          "Το clean δεν είναι curl. Είναι swing-derived τρόπος να φέρεις το bell στο rack. Η hand insertion, δηλαδή το να μπει το χέρι σωστά μέσα στο handle χωρίς να χτυπάει το bell τον καρπό, γίνεται σημαντική όσο προχωράς σε clean και snatch.",
          "Αν το rack σου είναι κακό, το press και το squat-to-press θα κοστίζουν πολύ. Αν το clean σου χτυπάει τον καρπό, δεν είσαι έτοιμος να το κάνεις γρήγορα ή βαριά. Το skill προηγείται της έντασης."
        ]
      },
      {
        heading: "Support χωρίς χάος",
        paragraphs: [
          "Push-ups και rows μπορούν να συμπληρώσουν upper body. Mobility μπορεί να κρατήσει hips, shoulders και spine διαθέσιμα. Carries μπορούν να χτίσουν grip και posture. Όλα αυτά είναι χρήσιμα όταν έχουν θέση.",
          "Ο κανόνας είναι απλός: δεν προσθέτω επειδή είδα κάτι. Προσθέτω επειδή ξέρω τι υπηρετεί."
        ]
      }
    ]
  },
  {
    id: "09",
    module: "Progression",
    title: "Progression, Tests And Earning Weight",
    eyebrow: "How you advance",
    summary: "Πώς ξέρεις ότι προχωράς: technique, time, reps, density, repeatability, load.",
    rule: "Το βάρος ανεβαίνει τελευταίο.",
    practice: "Πριν αυξήσεις κιλά, πρέπει να έχεις περάσει τεχνική, πυκνότητα και repeatability. Μία καλή μέρα δεν είναι σύστημα.",
    art: "ladder",
    body: [
      {
        heading: "Οι μοχλοί προόδου",
        paragraphs: [
          "Πρόοδος δεν σημαίνει μόνο βαρύτερο kettlebell. Μπορείς να προοδεύσεις με καλύτερη τεχνική, περισσότερες reps στον ίδιο χρόνο, λιγότερη ξεκούραση, καλύτερη αναπνοή, περισσότερα καθαρά λεπτά δουλειάς ή πιο δύσκολο benchmark.",
          "Αν ανεβάζεις βάρος πριν σταθεροποιηθούν αυτά, συχνά απλώς κάνεις το λάθος πιο βαρύ. Γι' αυτό το βάρος μπαίνει τελευταίο."
        ]
      },
      {
        heading: "Το 10-minute engine",
        paragraphs: [
          "Ένα απλό progression είναι το 10λεπτο. Διαλέγεις κίνηση και δουλεύεις μέσα σε 10 λεπτά. Ξεκινάς με λίγες καθαρές reps ανά λεπτό, π.χ. 5. Με τον καιρό ανεβαίνεις προς 10 reps ανά λεπτό.",
          "Όταν μπορείς να κάνεις 100 καθαρές reps στο ίδιο βάρος μέσα στο ίδιο χρονικό πλαίσιο, έχεις σοβαρή ένδειξη ότι το βάρος έχει γίνει δικό σου. Τότε μπορείς να σκεφτείς επόμενο βάρος και να γυρίσεις πάλι σε χαμηλότερες reps."
        ]
      },
      {
        heading: "Benchmark tests",
        paragraphs: [
          "Το πιο γνωστό advanced benchmark είναι 100 snatches σε 5 λεπτά, 50 ανά χέρι. Αν δεν είσαι εκεί, δεν ξεκινάς από το τελικό test. Χτίζεις δρόμο: 100 reps σε 10 λεπτά, μετά 9, 8, 7, 6, μέχρι 5.",
          "Και όταν περάσεις ένα benchmark, δεν ανεβαίνεις αμέσως επειδή πανηγύρισες μία φορά. Θέλεις repeatability: το ίδιο standard σε τρεις διαφορετικές προπονήσεις. Τότε το επόμενο bell έχει νόημα."
        ]
      }
    ]
  },
  {
    id: "10",
    module: "Lifetime Practice",
    title: "Weekly Rhythm, Mobility And The Long Game",
    eyebrow: "How it lives",
    summary: "Πώς το σύστημα γίνεται εβδομάδα, συνήθεια και μακροχρόνια πρακτική.",
    rule: "Το σύστημα πρέπει να είναι αρκετά δυνατό για πρόοδο και αρκετά απλό για να συνεχιστεί.",
    practice: "Στήσε εβδομάδα με 2-3 σοβαρές προπονήσεις, daily floor κινητικότητας και αρκετή ανάκαμψη ώστε να μπορείς να επιστρέψεις καλύτερος.",
    art: "loop",
    body: [
      {
        heading: "Η εβδομάδα",
        paragraphs: [
          "Μια καθαρή εβδομάδα δεν χρειάζεται να είναι περίπλοκη. Για τους περισσότερους, 2-3 σοβαρές προπονήσεις kettlebell είναι αρκετή βάση. Μπορεί να υπάρχει μία πιο ελαφριά μέρα με mobility, τεχνική ή περπάτημα. Αν υπάρχει μεγαλύτερο session, δεν πρέπει να καταστρέφει την υπόλοιπη εβδομάδα.",
          "Η συνέπεια έρχεται όταν το πρόγραμμα μπορεί να επαναληφθεί. Αν κάθε προπόνηση σε διαλύει, σύντομα δεν θα κάνεις σύστημα. Θα κάνεις σποραδικά hero workouts."
        ]
      },
      {
        heading: "Mobility και warm-up",
        paragraphs: [
          "Η κινητικότητα δεν είναι διακόσμηση. Είναι maintenance. Πριν την προπόνηση θέλεις αρθρώσεις που κινούνται, hips που ανοίγουν, shoulders που δεν αντιστέκονται, και λίγο ανέβασμα θερμοκρασίας ώστε το σώμα να μπει σε work mode.",
          "Μετά ή σε ξεχωριστές μικρές δόσεις, mobility και stretching μπορούν να βοηθήσουν αποσυμπίεση, αναπνοή και recovery. Δεν χρειάζεται να είναι τεράστιο. Χρειάζεται να είναι αρκετά σταθερό ώστε το σώμα να μην ξεχνάει να κινείται."
        ]
      },
      {
        heading: "Το long game",
        paragraphs: [
          "Ο κύκλος είναι: μάθε τις κινήσεις, κράτα τις ίδιες, χτίσε ποιότητα, πέρασε τεστ, πέρασε το ξανά, ανέβα βάρος, γύρνα στη βάση. Αυτό μπορεί να κρατήσει χρόνια χωρίς να γίνει βαρετό, επειδή κάθε κύκλος ζητάει καλύτερη εκτέλεση.",
          "Ο στόχος δεν είναι να τελειώσεις το σύστημα. Ο στόχος είναι να έχεις ένα σύστημα που δεν χρειάζεται να ξαναψάχνεις κάθε μήνα."
        ]
      }
    ]
  }
];

const SYSTEM_MODULES = [
  "Foundations",
  "Base Movements",
  "Training Design",
  "Progression",
  "Lifetime Practice"
];

let pendingConquestLevel = null;
let lastDeletedWorkout = null;
let undoTimer = null;
let selectedLessonId = null;
