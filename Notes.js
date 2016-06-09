
function NotesManager() {
    this.notes = [];
}
// "help" button click handler
NotesManager.prototype.handleOpenHelp = function (evt) {
    if (!this.$help.is(":visible")) {
        evt.preventDefault();
        evt.stopPropagation();
        this.showHelp();
    }
};


NotesManager.prototype.showHelp = function () {
    //Show the 'help' div
    var self = this;
    self.$help.show();

    //Register a new event listener to watch for clicks on the capturing phase
    document.addEventListener('click', function ev_handler(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation();

        //Remove the listener
        document.removeEventListener('click', ev_handler, true);
        //Call hideHelp() when this event occurs
        self.hideHelp();
    }, true);

};

NotesManager.prototype.hideHelp = function () {
    this.$help.hide();
};

//Handle keypress on 'note' input element
NotesManager.prototype.handleEnter = function (ev) {

    //If the 'enter' button is pressed
    if (ev.which === 13) {
        this.addCurrentNote();
    }
};

//Add note handler
NotesManager.prototype.handleAddNote = function (ev) {
    this.addCurrentNote();

};

NotesManager.prototype.addCurrentNote = function () {
    //Get the 'note' from the '#note' element
    var curr_note = this.$('#note').val();

    if (curr_note) {
        //Add the 'note' value to the `notes` data
        this.notes.push(curr_note);
        this.addNote(curr_note);
        this.$new_note.val("");
    }
};

NotesManager.prototype.addNote = function (curr_note) {
    this.$notes.prepend(
        /*" <a class='note' href='#'>" + curr_note + "</a>"*/
        $("<a href='#'></a>")
            .addClass("note")
            .text(curr_note)
    );
};


NotesManager.prototype.handleDocumentClick = function () {

    this.$notes.removeClass("active");
    this.$notes.children(".note").removeClass("highlighted");
};


NotesManager.prototype.handleNoteClick = function (evt) {
    evt.preventDefault();
    evt.stopPropagation();

    this.$notes.addClass("active");
    this.$notes.children(".note").removeClass("highlighted");
    $(evt.target).addClass("highlighted");
};


//The parent method -- init()
NotesManager.prototype.init = function (args) {
    // build the initial list from the existing `notes` data
    var html = "";
    this.$notes = $(args.notes),
        this.$new_note = $(args.new_note),
        this.$add_note = $(args.add_note),
        this.$help = $(args.help),
        this.$open_help = $(args.open_help);

    for (var i = 0; i < notes.length; i++) {
        html = html + " <a class='note' href='#'>" + notes[i] + "</a>";
    }

    //Insert the list to the notes div
    this.$notes.html(html);

    // listen to "help" button
    this.$open_help.on('click', this.handleOpenHelp.bind(this));

    // listen to "add" button
    this.$add_note.on('click', this.handleAddNote.bind(this));

    // listen for <enter> in text box
    this.$new_note.on('keypress', this.handleEnter.bind(this));

    // listen for clicks outside the notes box
    $(document).on('click', this.handleDocumentClick.bind(this));

    // listen for clicks on note elements
    this.$notes.on('click', '.note', this.handleNoteClick.bind(this));
};

//Load the data locally
NotesManager.prototype.loadData = function (data) {
    for (var i = 0; i < data.length; i++) {
        this.notes.push(data[i]);
    }
};

var notes1 = new NotesManager();


//Assume this data comes from the database
notes1.loadData([
    "My first note!",
    "Where there is a will, there is a 'high' way!",
    "The quick brown fox jumped over the moon."
]);


$(document).ready(function () {
    notes1.init({
        notes: "#notes",
        new_note: "#note",
        add_note: "#add_note",
        help: "#help",
        open_help: "#open_help"
    });
});
