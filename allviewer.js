var viewname, editorAce, editorResult, old = '', fileName1 = '', fileName2 = '', converted = '', json = '', editor, isXmlData = true,
paragraphFlag = false, oldData = "", highlightedText = '', popupStatus = 0,canvas,context;

$(document)
		.ready(
				function() {

					viewname = $("#viewName").val().trim();

					if (viewname == 'actionscript') {
						setViewTitle("Action Script VIEWER", true, true);
						createEditor("actionscript", "actionscript");
					} else if (viewname == 'alleditor') {
						ace.require("ace/ext/language_tools");
						createEditor("text");
						editorAce.setOptions({
							enableBasicAutocompletion : true,
							enableSnippets : true,
							enableLiveAutocompletion : true
						});
					} else if (viewname == 'api-test') {
						createEditor(null, "html");
					} else if (viewname == 'csharpviewer') {
						setViewTitle("C# VIEWER", true, true);
						createEditor("csharp", "csharp");
					} else if (viewname == 'css-beautify-minify') {
						setViewTitle("CSS BEAUTIFY AND MINIFY", true, true);
						createEditor("css", "css");
					} else if (viewname == "cssvalidate") {
						$(function() {
							$("#cssData").bind("paste", function(e) {
								setTimeout('validateCSS()', 100);
							});
						});

						$('#cssData').keyup(function(e) {
							if (e.keyCode == 8 || e.keyCode == 46) { // backspace
								// and
								// delete
								// key
								validateCSS();
							} else { // rest ignore
								e.preventDefault();
							}
						});
						setViewTitle("CSS Validator", true, true);
					} else if (viewname == "date-time-calculate") {
						$("#summary").hide();
						$(".bugs_error").delegate(".close_err", 'click',
								function() {
									$('.bugs_error').slideUp("slow");
								});

						$("#moreMenu").show();

						$(".dd_mm").mask("99");
						$(".dd_mm_yy").mask("9999");
					} else if (viewname == "excel-to-html") {
						setViewTitle("EXCEL TO HTML", true, false);
						$("#excelTohtml").click();
					} else if (viewname == "file-difference") {
						$("#F1").click();
						$("#F2").click();

						$('#advopt').click(function() {
							$('.option').slideDown();
							$('#advopt').hide();
							$('#hadvopt').Show();

						});
						$('#hadvopt').click(function() {
							$('.option').slideUp();
							$('#advopt').show();
							$('#hadvopt').hide();

						});
					} else if (viewname == "html-to-csv-converter") {
						setViewTitle("HTML TO CSV Converter", true, true);
						createEditor("html", "text");
					} else if (viewname == "htmlviewer") {
						setViewTitle("HTML VIEWER", true, true);
						createEditor("html", "html");
					} else if (viewname == "javaviewer") {
						setViewTitle("JAVA VIEWER", true, true);
						createEditor("java", "java");
					} else if (viewname == "jsvalidate") {
						setViewTitle("JavaScript Validator", true, true);
						$(function() {
							$("#jsData").bind("paste", function(e) {
								setTimeout('validateJS()', 100);
							});
						});

						$('#jsData').keyup(function(e) {
							if (e.keyCode == 8 || e.keyCode == 46) { // backspace
								// and
								// delete
								// key
								validateJS();
							} else { // rest ignore
								e.preventDefault();
							}
						});
					} else if (viewname == "jsviewer") {
						setViewTitle("JavaScript VIEWER", true, true);
						createEditor("javascript", "javascript");
					} else if (viewname == "mxmlviewer") {
						setViewTitle("MXML VIEWER", true, true);
						createEditor("xml", "xml");
					} else if (viewname == "opml-to-json-converter") {
						mode = document.getElementById('mode');
						mode.onchange = function() {
							editor.setMode(mode.value);
							showJSON(true);
						};

						var container = document.getElementById("jsoneditor");

						var options = {
							mode : mode.value,
							error : function(err) {
								openErrorDialog(err.toString());
							}
						};
						editor = new jsoneditor.JSONEditor(container, options,
								json);
						setViewTitle("OPML TO JSON CONVERTER", true, true);
						createEditor("xml", "xml");
					} else if (viewname == "opmlviewer") {
						setViewTitle("OPML VIEWER", true, true);
						createEditor("xml", "xml");
					} else if (viewname == "rssviewer") {
						setViewTitle("RSS VIEWER", true, true);
						createEditor("xml", "json");
					} else if (viewname == "source-code-viewer") {
						createEditor("html");
						editorAce.setOptions({
							enableBasicAutocompletion : true,
							enableSnippets : true,
							enableLiveAutocompletion : false
						});
					} else if (viewname == "wordcounter") {

						$('#tData').keyup(function(e) {
							if (e.keyCode == 8 || e.keyCode == 46) { // backspace
								// and
								// delete
								// key
								countWord();
							} else { // rest ignore
								e.preventDefault();
							}
						});

						$("#tData").highlightTextarea({
							caseSensitive : false
						});
						$("body").on(
								'click',
								'td span',
								function() {
									highlightedText = $(this).text();
									$("#tData").highlightTextarea('enable');
									$("#tData").highlightTextarea('setWords',
											$(this).text());
								});

						$("#tData").bind("paste", function(e) {
							$("#caseSelect").val(0);
							setTimeout('countWord()', 100);
						});
						setViewTitle("Words Counter", true, true);

						String.prototype.toProperCase = function() {
							var words = this.split(' ');
							var results = [];
							for (var i = 0; i < words.length; i++) {
								var letter = words[i].charAt(0).toUpperCase();
								results.push(letter + words[i].slice(1));
							}
							return results.join(' ');
						};
					} else if (viewname == "Xpath-Tester") {
						createEditor("xml", "xml");
						setViewTitle("XPATH TESTER / EVALUATOR", true, false);
						$("#closemsg").click(function() {
							$("#hResult").hide();
							$("#closemsg").hide();

						});
						$("#mainLeftDiv").hide();

						$("#xpath-examples").click(function() {
							$('html, body').animate({
								scrollTop : $("#testCase1").offset().top
							}, 1000);
						});
					} else if (viewname == "yaml-to-json-xml-csv") {
						setViewTitle("YAML Converter", true, false);
						createEditor("yaml", "json");
					} else if (viewname == "yaml-validator") {
						setViewTitle("YAML Validator", true, false);
						createEditor("yaml");
						editorAce.on("focus", function() {
							$("#editor").css({
								'border' : '1px solid #BCBDBA'
							});
						});
					} else if (viewname == "send-snap-message") {
						$("#openphoto").click(function() {
							loadPopup();
						});
						$(".openPhotoDiv").hide();
						/* event for close the popup */

						$("div.close").click(function() {
							disablePopup(); // function close pop up
						});

						$("div#backgroundPopup").click(function() {
							disablePopup(); // function close pop up
						});

						$("#messageOption").click(function() {
							$(".snapMessageOption").toggle();
						});

						$('#createAnotherSnap').click(
								function() {
									location.reload();
									$('.MainMessageContainerDiv').removeClass(
											'hideImportant');
									$('.messageAlertDiv').hide();
								});
						$('#destroyMessage').click(function() {
							location.reload();
						});

						var note = $('#note');
						var noteClass = $('.snote');

						var lineHeight = parseInt(noteClass.css('line-height')), minHeight = parseInt(noteClass
								.css('min-height')), lastHeight = minHeight, newHeight = 0, newLines = 0;

						var countLinesRegex = new RegExp('\n', 'g');

						note.on(
								'input',
								function(e) {

									// Count the number of new lines
									newLines = note.val()
											.match(countLinesRegex);

									if (!newLines) {
										newLines = [];
									}

									// Increase the height of the note (if
									// needed)
									newHeight = Math.max((newLines.length + 1)
											* lineHeight, minHeight);

									if (newHeight != lastHeight) {
										note.height(newHeight);
										lastHeight = newHeight;
									}
								}).trigger('input'); // This line will resize
						// the note on page load

						$('#uploadPhotobtn').click();

					} else if (viewname == "ipcheck-weatherinfo-latestnews") {
						setInterval('time1()', 1000);
						BindUserInfo();
					} else if (viewname == "tweet-big") {
						setViewTitle("Tweet Big", true, false);
						$(".permalinkButtonDiv").hide();
						$(".headerMenu").css({
							'margin-right' : '-85px'
						});

						$("#canvas").css({
							'background-color' : 'whitesmoke'
						});
						
						var myCanvas = createHiDPICanvas(1000,800);
						$("#canDiv").html(myCanvas);
						
						canvas = document.getElementById("canvas");
						context = canvas.getContext("2d");
						
						var loginWith = $("#loginWith").val();

						if (loginWith != null && loginWith.trim().length != 0) {
							if (loginWith != "Twitter") {
								TwitterLogin();
							}
						} else {
							TwitterLogin();
						}
					}
					
				});

function setToEditor(data) {

	if (viewname == 'alleditor') {
		if (data.trim().length > 0) {

			var n = data.lastIndexOf("|");
			var lang = data.substr(n + 1, data.length);
			$("#editorLanguage").val(lang);
			setLangauge();
			editorAce.setValue(data.substr(0, n));
			editorAce.clearSelection();
		}
	} else if (viewname == 'api-test') {
		var mode = 'text';

		var dataType = data.type;

		var content = data.body;

		if (dataType != null && dataType != 'error' && dataType != false
				&& dataType.trim().length != 0) {
			if (dataType.search('html') != -1) {
				mode = 'html';
				content = vkbeautify.xml(content);
			} else if (dataType.search('json') != -1) {
				mode = 'json';
				content = vkbeautify.json(content);
			} else if (dataType.search('xml') != -1) {
				mode = 'xml';
				content = vkbeautify.xml(content);
			} else if (dataType.search('css') != -1) {
				mode = 'css';
				content = cssbeautify(content, {
					indent : '  ',
					openbrace : 'end-of-line',
					autosemicolon : true
				});

			}
		}

		createEditor(null, mode);
		editorResult.setValue(data.header + "\n\n" + content);
		editorResult.clearSelection();

		editorResult.navigateFileStart();
	} else if (viewname == 'cssvalidate') {
		$("#cssData").val(data);
	} else if (viewname == 'excel-to-html') {
		htmlOutput(data);
	} else if (viewname == 'file-difference') {
		$("#file1").val('');
		$("#file1").val(data);
	} else if (viewname == 'jsvalidate') {
		$("#jsData").val(data);
		validateJS();
	} else if (viewname == "wordcounter") {
		$("#tData").val("");
		$("#tData").val(data);
		$("#tData").focus();
		countWord();
	} else if (viewname == "Xpath-Tester") {
		$("#xmlString").val(data);
	} else {
		editorAce.setValue(data);
	}

	if (viewname == 'actionscript' || viewname == "csharpviewer"
			|| viewname == "javaviewer" || viewname == "jsviewer") {
		FormatJS();
	} else if (viewname == 'css-beautify-minify') {
		FormatCSS();
	} else if (viewname == 'cssvalidate') {
		validateCSS();
	} else if (viewname == "html-to-csv-converter") {
		htmlTocsv();
	} else if (viewname == "htmlviewer") {
		$("#result").show();
		$("#result1").hide();
		htmlOutput();
	} else if (viewname == "mxmlviewer") {
		FormatMXML();
	} else if (viewname == "opml-to-json-converter") {
		showJSON();
	} else if (viewname == "opmlviewer") {
		isXmlData = true;
		xmlTreeView();
	} else if (viewname == "rssviewer") {
		FormatXML();
	} else if (viewname == "yaml-to-json-xml-csv") {
		yamlToJson();
	} else if (viewname == "yaml-validator") {
		YAMLValidator();
	}
}

// actionscript
function FormatJS() {
	editorResult.getSession().setUseWrapMode(false);
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		var code = js_beautify(oldformat, {
			'indent_size' : 1,
			'indent_char' : '\t'
		});

		if (viewname == 'actionscript') {
			setOutputMsg("Beautify Action Script");
		} else if (viewname == "csharpviewer") {
			setOutputMsg("Beautify C#");
			code = code.split("= >").join("=>");
			code = code.split("> =").join(">=");
		} else if (viewname == "javaviewer") {
			setOutputMsg("Beautify Java");
			code = code.split("- >").join("->");
			//code = code.split("> =").join(">=");
		} else if (viewname == "jsviewer") {
			setOutputMsg("Beautify Javascript");
		}
		
		editorResult.setValue(code);
	}
}

function MinifyJS() {
	editorResult.getSession().setUseWrapMode(true);
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {

		$.ajax({
			type : "post",
			url : globalurl + "service/jsmin",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {
					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("invalid Input");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed Minifining=" + s);

			}
		});
		if (viewname == 'actionscript') {
			setOutputMsg("Minify Action Script");
		} else if (viewname == "csharpviewer") {
			setOutputMsg("Minify C#");
		} else if (viewname == "javaviewer") {
			setOutputMsg("Minify Java");
		} else if (viewname == "jsviewer") {
			setOutputMsg("Minify JavaScript");
		}
	}
}

// api-test
function setErrorToEditor(data) {
	createEditor(null, "html");
	editorResult.setValue(data);
	editorResult.clearSelection();

	editorResult.navigateFileStart();
}

// css-beautify-minify
function FormatCSS() {
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		editorResult.getSession().setUseWrapMode(false);
		// var newformat=vkbeautify.css(oldformat);
		var newformat = cssbeautify(oldformat, {
			indent : '  ',
			openbrace : 'end-of-line',
			autosemicolon : true
		});

		editorResult.setValue(newformat);
		editorResult.getSession().setUseWrapMode(false);

		setOutputMsg("Beautify CSS");
	}
}

function MinifyCSS() {
	editorResult.getSession().setUseWrapMode(true);

	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		$.ajax({
			type : "post",
			url : globalurl + "service/cssmin",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {
					// var obj=JSON.parse(response);
					editorResult.getSession().setUseWrapMode(true);
					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("invalid CSS");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed Minifining=" + s);
			}
		});
		setOutputMsg("Minify CSS");
	}
}
function gotoCSSValidator() {
	var data = editorAce.getValue();
	var form = $('<form action="/cssvalidate/" method="post">'
			+ '<input type="text" name="value" value="' + data.trim() + '" />'
			+ '</form>');

	$('body').append(form);
	$(form).submit();
}

// css validate
function validateCSS() {
	if (validate($("#cssData").val().trim()) != " "
			&& $("#cssData").val().trim().length > 0) {
		results = CSSLint.verify($("#cssData").val());
		messages = results.messages;
		var arr = new Array();

		try {
			$
					.each(
							messages,
							function(i, value) {

								arr[i] = [
										(i + 1),
										validate(value.type),
										validate(value.line),
										validate(value.col),
										validate(value.rule.name),
										(validate(value.evidence) + "<br>" + validate(value.message)),
										validate(value.rule.desc),
										validate(value.rule.browsers) ];

							});
		} catch (e) {
			console.log(e);
		}
		drawErrorTableCSS(arr);
	} else {
		$("#hResult").hide();
	}
}
function validate(arg) {
	if (arg == undefined || arg == null || arg == "") {
		return "";
	} else {
		return arg;
	}
}

function drawErrorTableCSS(arr) {
	$("#hResult").show();
	$('#cssValidateErrorTable').dataTable({
		"bRetrieve" : false,
		"bDestroy" : true,
		"bPaginate" : true,
		"bJQueryUI" : true,
		"aaSorting" : [ [ 0, 'asc' ] ],
		"aaData" : arr,
		"oLanguage" : {
			"sEmptyTable" : "No Error Found,Its Perfect CSS Code"
		},
		"aoColumns" : [ {
			"sTitle" : "No.",
			"bVisible" : true,
			"sWidth" : "3%"

		}, {
			"sTitle" : "Type",
			"bVisible" : true

		}, {
			"sTitle" : "Line",
			"bVisible" : true,
			"sWidth" : "3%"

		}, {
			"sTitle" : "Column",
			"bVisible" : true,
			"sWidth" : "3%"

		}, {
			"sTitle" : "Title",
			"bVisible" : true,

		}, {
			"sTitle" : "Description",
			"bVisible" : true,

		}, {
			"sTitle" : "Rules",
			"bVisible" : true
		}, {
			"sTitle" : "Browser",
			"bVisible" : true
		} ]
	});

	$.fn.dataTableExt.sErrMode = 'mute';
}
function FormatCSS_JS() {

	var textBoxId = "";
	if ($("#cssData").length != 0) {
		textBoxId = "cssData";
	} else {
		textBoxId = "jsData";
	}

	var oldformat = $("#" + textBoxId).val();

	if (oldformat.trim().length > 0) {

		var newformat = cssbeautify(oldformat, {
			indent : '  ',
			openbrace : 'end-of-line',
			autosemicolon : true
		});

		$("#" + textBoxId).val("");
		$("#" + textBoxId).val(newformat);

	}
}
function clearCSS() {
	$("#cssData").val("");
	$("#hResult").hide();
}

// date-time-calculate
function calculateDiff() {

	$("#summary").show();
	var startDate = $("#sm").val() + "/" + $("#sd").val() + "/"
			+ $("#sy").val();
	var endDate = $("#em").val() + "/" + $("#ed").val() + "/" + $("#ey").val();

	if (startDate.trim().length == 10) {
		if (endDate.trim().length == 10) {
			if (checkdate(startDate, 'start')) {
				if (checkdate(endDate, 'end')) {
					var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
					var firstDate = new Date(startDate);
					var secondDate = new Date(endDate);

					var fullYMDDetails = "";
					var compareDateString = "";

					if (firstDate > secondDate) {
						compareDateString = "<div class='span12 impwarning'><b>Important : </b>The Start date was after the End date, so the Start and End fields were <b>SWAPPED</b>.</div>";
						fullYMDDetails = fullYMD(secondDate, firstDate);
					} else {
						fullYMDDetails = fullYMD(firstDate, secondDate);
					}

					var diffDays = Math.round(Math
							.abs((firstDate.getTime() - secondDate.getTime())
									/ (oneDay)));

					var days = diffDays;
					var weeks = Math.floor(diffDays / 7);
					var months = Math.floor(diffDays / 30);
					var years = Math.floor(diffDays / 365);

					var seconds = diffDays * 86400;
					var minutes = diffDays * 1440;
					var hours = diffDays * 24;

					var tables = "";

					tables += "<div class='span12'>";
					tables += compareDateString;
					tables += "<div class='span12 outputs' style='margin: 0;'><h1>Your Result</h1>";
					tables += "<div class='span6' style='margin: 0;'><h4>From Date : <b>"
							+ firstDate.toDateString() + "</b></h4>";
					tables += "<h4>To Date, But not Include  : <b>"
							+ secondDate.toDateString() + "</b></h4></div>";
					tables += "<div class='span6' ><ul style='list-style-type: circle;'>";
					tables += "<li>" + years + " <b>Years</b></li>";
					tables += "<li>" + months + " <b>Months</b></li>";
					tables += "<li>" + days + " <b>Days</b></li>";
					tables += "<li>" + weeks + " <b>Weeks(Approx.)</b></li>";
					tables += "<li>"
							+ hours.toString().replace(/(\d)(?=(\d{3})+\b)/g,
									'$1,') + " <b>Hours</b></li>";
					tables += "<li>"
							+ minutes.toString().replace(/(\d)(?=(\d{3})+\b)/g,
									'$1,') + " <b>Minutes</b></li>";
					tables += "<li>"
							+ seconds.toString().replace(/(\d)(?=(\d{3})+\b)/g,
									'$1,') + " <b>Seconds</b></li>";

					tables += "</div></table></div>";

					$("#summary").html('');
					$("#summary").append(tables).fadeIn('slow');
					$("#summary").append(
							"<div class='span12 summurize_info impwarning'>"
									+ fullYMDDetails + "</div></div>");
					$('.bugs_error').css('display', 'none');
				}
			}
		} else {
			$("#summary").html('');
			$("#summary").hide();
			$('.bugs_error')
					.html(
							"Please enter the End date <span class='close_err'>X</span>");
			$('.bugs_error').css('display', 'block');
			$('.bugs_error').css('opacity', 1);
		}
	} else {
		// openErrorDialog("Please enter the start date");
		$("#summary").html('');
		$("#summary").hide();
		$('.bugs_error').html(
				"Please enter the Start date <span class='close_err'>X</span>");
		$('.bugs_error').css('display', 'block');
		$('.bugs_error').css('opacity', 1);

	}
}
function masking(input) {
	var v = input.value;
	if (v.match(/^\d{2}$/) !== null) {
		input.value = v + '/';
	} else if (v.match(/^\d{2}\/\d{2}$/) !== null) {
		input.value = v + '/';
	}
}

function checkdate(input, tag) {
	var validformat = /^\d{2}\/\d{2}\/\d{4}$/;
	var returnval = false;

	var date = "Start Date";
	if (tag == 'end') {
		date = "End Date";
	}
	if (!validformat.test(input)) {
		$("#summary").html('');
		$("#summary").hide();
		$('.bugs_error')
				.html(
						"Invalid "
								+ date
								+ " Format. Enter DD/MM/YYYY Format<span class='close_err'>X</span>");
		$('.bugs_error').css('display', 'block');
		$('.bugs_error').css('opacity', 1);
	} else { // Detailed check for valid date ranges
		var monthfield = input.split("/")[0];
		var dayfield = input.split("/")[1];
		var yearfield = input.split("/")[2];
		var dayobj = new Date(yearfield, monthfield - 1, dayfield);
		if ((dayobj.getMonth() + 1 != monthfield)
				|| (dayobj.getDate() != dayfield)
				|| (dayobj.getFullYear() != yearfield)) {
			$("#summary").html('');
			$("#summary").hide();
			$('.bugs_error')
					.html(
							"Invalid "
									+ date
									+ " Format. Enter DD/MM/YYYY Format<span class='close_err'>X</span>");
			$('.bugs_error').css('display', 'block');
			$('.bugs_error').css('opacity', 1);
		} else {
			returnval = true;
		}

		if (returnval == false) {
			$("#" + input).focus();
		}
	}
	return returnval;
}

function autoAddZero(input) {
	if (input.value.indexOf('_') >= 0) {
		input.value = "0" + input.value;
	}
}

function fullYMD(fromdate, todate) {
	if (todate)
		todate = new Date(todate);
	else
		todate = new Date();

	var age = [], fromdate = new Date(fromdate), y = [ todate.getFullYear(),
			fromdate.getFullYear() ], ydiff = y[0] - y[1], m = [
			todate.getMonth(), fromdate.getMonth() ], mdiff = m[0] - m[1], d = [
			todate.getDate(), fromdate.getDate() ], ddiff = d[0] - d[1];

	if (mdiff < 0 || (mdiff === 0 && ddiff < 0))
		--ydiff;
	if (mdiff < 0)
		mdiff += 12;
	if (ddiff < 0) {
		fromdate.setMonth(m[1] + 1, 0);
		ddiff = fromdate.getDate() - d[1] + d[0];
		--mdiff;
	}
	if (ydiff > 0)
		age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
	if (mdiff > 0)
		age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
	if (ddiff > 0)
		age.push(ddiff + ' day' + (ddiff > 1 ? 's' : ''));
	if (age.length > 1)
		age.splice(age.length - 1, 0, ' and ');
	return age.join('');
}

// excel to html
function htmlOutput(content) {
	
	$("#excelToHtmlData").text("");
	
	var data = content;

	if (viewname == "htmlviewer") {
		$("#result").hide();
		$("#result1").show();
		data = editorAce.getValue();
		setOutputMsg("HTML Output");
	}

	if (data.trim().length > 0) {
		var result1 = document.getElementById("result1");
		var d = result1.contentWindow.document;

		if (old != data) {
			
			var htmlString = "<html>\n";
				htmlString = htmlString + "<head><title>Excel To HTML using codebeautify.org</title></head>\n";
				htmlString = htmlString + "<body>\n";
				htmlString = htmlString +  data;
				htmlString = htmlString + "\n</body>\n";
				htmlString = htmlString + "</html>";
			
			$("#excelToHtmlData").text(htmlString);
			
			old = data;
			d.open();
			if (viewname == "htmlviewer") {
				d.write(old);
			} else {
				d.write("<center>" + old + "</center>");
			}
			d.close();
		}

		$("html, body").animate({
			scrollTop : 0
		}, 10);
	}
}

// file-difference
function clear12(id) {
	$('#' + id).val('');
}
function setToEditor2(res) {
	$("#file2").val('');
	$("#file2").val(res);
}
function setFileName(which, name) {
	if (which == 1) {
		fileName1 = name;
	} else {
		fileName2 = name;
	}
}

// html-to-csv-converter
function htmlTocsv() {

	var data = editorAce.getValue();

	try {

		if (data != null && data.trim().length != 0) {
			$("#templTableDiv").html(data.replace(/<script/gmi, "<xxxxx"));

			var cols = [];
			var content = "";
			$('#templTableDiv table th').each(function() {
				cols.push($(this).text().toLowerCase());
			});
			$('#templTableDiv table tr').each(function(id) {
				var result = [];
				$(this).find('td').each(function(index) {
					result.push($(this).text().toLowerCase());
				});
				content += result.join() + "\n";
			});

			editorResult.setValue(cols.join() + content);

			setOutputMsg("HTML TO CSV");
		}
	} catch (e) {
		console.log(e);
		editorResult.setValue("Error To  Converting CSV");
	}
}

// html viewer
function FormatHTML() {
	$("#result").show();
	$("#result1").hide();
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		editorResult.getSession().setUseWrapMode(false);
		var newformat = vkbeautify.xml(oldformat);
		editorResult.setValue(newformat);

		setOutputMsg("Beautify HTML");
	}
}

function MinifyHTML() {
	$("#result").show();
	$("#result1").hide();
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		editorResult.getSession().setUseWrapMode(true);
		var newformat = vkbeautify.xmlmin(oldformat);
		editorResult.setValue(newformat);

		setOutputMsg("Minify HTML");
	}
}

// jsvalidate
function validateJS() {
	if (validate($("#jsData").val().trim()) != " "
			&& $("#jsData").val().trim().length > 0) {

		var arr = new Array();

		JSLINT($("#jsData").val());

		var messages = JSLINT.data();

		try {
			$
					.each(
							messages.errors,
							function(i, value) {
								arr[i] = [
										(i + 1),
										validate(value.line),
										validate(value.character),
										(validate(value.reason) + "<br>" + validate(value.evidence)) ];
							});
		} catch (e) {
			console.log(e);
		}
		drawErrorTableJS(arr);
	} else {
		$("#hResult").hide();
	}
}

function drawErrorTableJS(arr) {
	$("#hResult").show();
	$('#jsValidateErrorTable').dataTable({
		"bRetrieve" : false,
		"bDestroy" : true,
		"bPaginate" : true,
		"bJQueryUI" : true,
		"aaSorting" : [ [ 0, 'asc' ] ],
		"aaData" : arr,
		"oLanguage" : {
			"sEmptyTable" : "No Error Found,Its Perfect JS Code"
		},
		"aoColumns" : [ {
			"sTitle" : "No.",
			"bVisible" : true,
			"sWidth" : "5%"

		}, {
			"sTitle" : "Line",
			"bVisible" : true,
			"sWidth" : "5%"

		}, {
			"sTitle" : "Character",
			"bVisible" : true,
			"sWidth" : "5%"

		}, {
			"sTitle" : "Description",
			"bVisible" : true,

		} ]
	});

	$.fn.dataTableExt.sErrMode = 'mute';
}
function clearJS() {
	$("#jsData").val("");
	$("#hResult").hide();
}

// jsviewer
function obfuscatorJS(oldformat) {
	if (oldformat.trim().length > 0) {
		$.ajax({
			type : "post",
			url : globalurl + "service/jsobfuscator",
			dataType : "text",
			data : {
				data : oldformat
			},
			success : function(response) {
				try {
					// var obj=JSON.parse(response);

					editorResult.setValue(response);

				} catch (e) {
					openErrorDialog("invalid Javascript");
				}
			},
			error : function(e, s, a) {
				openErrorDialog("Failed Minifining=" + s);
			}
		});
	}
}
function jsOutput() {
	var data = editorAce.getValue();
	if (data.trim().length > 0) {
		$("#result").hide();
		$("#result1").show();

		var result1 = document.getElementById("result1");
		var d = result1.contentWindow.document;

		if (old != data) {
			if (!data.match(/<script[\s\S]*?>[\s\S]*?<\/script>/g)) {
				data = "<script>" + data + "<\/script>";

			}
			old = data;
			d.open();
			d.write(old);
			d.close();
		}

		$("html, body").animate({
			scrollTop : 0
		}, 10);
		setOutputMsg("Javascript Output");
	}
}
function performJS(type) {
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		if (detectHtmlTags(oldformat)) {
			var msg = "Do you want to remove html tags..?";
			$('<div></div>').appendTo('#openError').html(
					'<div>' + msg + '</h5></div>').dialog({
				modal : true,
				title : "Message",
				zIndex : 10000,
				autoOpen : true,
				width : '400',
				resizable : false,
				buttons : {
					Yes : function() {
						$("#openError").html('');

						callbackJS(type, true, oldformat);

						$(this).dialog('destroy');

					},
					No : function(event, ui) {

						callbackJS(type, false, oldformat);

						$(this).dialog('destroy');

					},
				}
			});

		} else {
			callbackJS(type, false, oldformat);
		}
	}
}

function callbackJS(type, flag, value) {
	$("#result").show();
	$("#result1").hide();
	// if perform obfuscator operation

	if (flag == true) {

		value = getjs(value);
		if (value.trim().length < 1) {

			openErrorDialog("Pls Check the input html tags placed in between javascript code,if want perform click on 'No'");
		}
	}

	if (type == 'beautify') {
		FormatJS(value);
	} else if (type == 'minify') {
		MinifyJS(value);
	} else if (type == 'obfuscator') {
		obfuscatorJS(value);
	}
}
function gotoJSValidator() {
	var data = editorAce.getValue();
	showProgress();
	$.ajax({
		type : "post",
		url : globalurl + "service/jsmin",
		dataType : "text",
		data : {
			data : data
		},
		success : function(response) {
			try {
				var f = document.createElement("form");
				f.setAttribute('method', "post");
				f.setAttribute('action', "/jsvalidate/");

				var i = document.createElement("input"); // input element,
				// text
				i.setAttribute('type', "text");
				i.setAttribute('name', "value");
				i.setAttribute('value', response);

				f.appendChild(i);

				$('body').append(f);
				$(f).submit();

			} catch (e) {
				openErrorDialog("invalid JS");
				hideProgress();
			}
		},
		error : function(e, s, a) {
			hideProgress();
		}
	});
}
// MXML Viewer
function FormatMXML() {
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {

		var newformat = vkbeautify.xml(oldformat);
		editorResult.setValue(newformat);

		setOutputMsg("Beautify MXML");
	}
}
function MinifyMXML() {
	editorResult.getSession().setUseWrapMode(true);
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		var newformat = vkbeautify.xmlmin(vkbeautify.xml(oldformat));
		editorResult.setValue(newformat);

		setOutputMsg("Minify MXML");
	}
}
// opml-to-json-converter
function showJSON() {

	isXmlData = false;
	editorResult.getSession().setMode("ace/mode/json");

	var xml = editorAce.getValue();

	if (xml.trim().length > 0) {

		$("#json").show();
		$("#xml").hide();
		$('#result').show();
		$('#result1').hide();

		var data = "";
		try {

			var x2js = new X2JS();

			if (typeof editorResult != undefined) {
				editorResult.setValue(vkbeautify.json(JSON.stringify(x2js
						.xml_str2json(xml))));
			}
			if (typeof editor != undefined) {
				editor.set(x2js.xml_str2json(xml));
				editor.expandAll(true);
			}
			setOutputMsg("OPML To JSON");

		} catch (e) {
			if (data != null && data.length != 0) {
				openErrorDialog("invalid OPML");
			}
		}
	}
}
function FormatXML() {
	editorResult.getSession().setUseWrapMode(false);
	isXmlData = true;
	editorResult.getSession().setMode("ace/mode/xml");
	$("#json").hide();
	$("#xml").show();

	$('#result').show();
	$('#result1').hide();

	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {

		var newformat = vkbeautify.xml(oldformat);
		if (viewname == "rssviewer") {
			$("#json").hide();
			$("#result1").show();
			editorAce.setValue(newformat);
			editorAce.getSession().setUseWrapMode(false);
		} else {
			editorResult.setValue(newformat);
		}
		setOutputMsg("Beautify OPML");
	}

}

function xmlTreeView() {
	isXmlData = true;
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		var newformat = vkbeautify.xml(oldformat);
		$('#result1').html("");
		$('#result1').show();
		$('#result').hide();
		new XMLTree({
			xml : newformat.trim(),
			container : '#result1',
			startExpanded : true
		});

		setOutputMsg("OPML Tree View");
	} else {
		$('#result1').html("");
	}
}
function createOPML2JSONFile() {
	var s = editor.getText();
	if (s.trim().length > 0) {
		var c = s.indexOf(':');
		var newstr = s.substring(c + 1, (s.length - 1));
		var obj = JSON.parse(newstr);
		var blob = new Blob([ "" + vkbeautify.json(obj) + "" ], {
			type : "text/plain;charset=utf-8"
		});
		saveAs(blob, "codebeautify.json");
	} else {
		openErrorDialog("Sorry Result is Empty..");
	}
}
function MinifyXML() {
	isXmlData = true;
	editorResult.getSession().setMode("ace/mode/xml");
	$('#result').show();
	$('#result1').hide();
	var oldformat = editorAce.getValue();
	editorResult.getSession().setUseWrapMode(true);
	if (oldformat.trim().length > 0) {
		var newformat = vkbeautify.xmlmin(vkbeautify.xml(oldformat));
		editorResult.setValue(newformat);

		setOutputMsg("Minify OPML");
	}
}
function createOPMLFile() {

	var data = editorAce.getValue();

	if (data.trim().length > 0) {

		var content = "";
		if ($("#result1").is(':visible')) {
			content = vkbeautify.xml(data);
		} else {
			content = editorResult.getValue();
		}

		if (content != null && content != "" && content.trim().length > 0) {
			var blob = new Blob([ "" + content + "" ], {
				type : "text/plain;charset=utf-8"
			});
			var fileName = "codebeautify.opml";
			if (isXmlData == false) {
				fileName = "codebeautify.json";
			}
			saveAs(blob, fileName);
		} else {
			openErrorDialog("Sorry Result is Empty");
		}
	}
}
// rss viewer
function htmlView() {
	$("#json").hide();
	$("#result1").show();
	setOutputMsg("HTML View");
}
function ConvertJSON() {
	try {
		var xml = editorAce.getValue();
		if (xml != null && xml.trim().length > 0) {

			setOutputMsg("XML To JSON");

			$("#json").show();
			$("#result1").hide();

			var x2js = new X2JS();

			var json = x2js.xml_str2json(xml);

			editorResult.setValue(vkbeautify.json(JSON.stringify((json))));
		}

	} catch (e) {

		openErrorDialog("invalid XML");

	}
}
// source-code-viewer
function view() {
	var path = $("#url").val();
	if (path.length > 5) {

		if (path.search("codebeautify.org") == -1) {
			$.ajax({
				type : "post",
				url : globalurl + "service/getdata",
				dataType : "text",
				data : {
					path : path
				},
				success : function(response) {

					editorAce.setValue(decodeSpecialCharacter(response));
					editorAce.getSession().setScrollTop(0);

				},
				error : function(e, s, a) {
					openErrorDialog("Failed to load data=" + s);
				}
			});
		} else {
			openErrorDialog("Access Denied for " + path);
		}
	}
}

// word counter
function keywordDensity() {

	if ($('#tData').val().trim().length > 0) {

		var allText = "";
		var max = 100000;
		$.wordStats.computeTopWords(max, $('#tData'));
		totalWeights = getTotalWeights($.wordStats.topWeights);
		var text = "<table>";
		var allText = "<table cellPadding='5'>";
		var percentage;
		for (i = 0; i < $.wordStats.topWords.length; i++) {

			percentage = (100 * ($.wordStats.topWeights[i] / totalWeights))
					.toFixed(0);
			if (i < 10) {
				text += "<tr><td><span><a>" + $.wordStats.topWords[i]
						+ "</a></span> " + $.wordStats.topWeights[i] + " ("
						+ percentage + "%)</td></tr>";
			}
			allText += "<tr><td><a title='Search " + $.wordStats.topWords[i]
					+ "' onclick=searchSelectedTextFromdialog('"
					+ $.wordStats.topWords[i] + "')>" + $.wordStats.topWords[i]
					+ "</a></td> <td> " + $.wordStats.topWeights[i]
					+ "</td> <td> (" + percentage + "%)</td></tr>";
		}

		if ($.wordStats.topWords.length > 10) {
			text += "<tr><td><a class='btn btn-danger' onclick=moreKeywordDialog();>More<a></td></tr>";
		}

		text += '</table>';
		allText += "</table>";

		$.wordStats.clear();
		$("#keyword").html("");
		$("#tempDiv").html("");
		$("#keyword").append(text);
		$("#tempDiv").append(allText);
	}

}

function moreKeywordDialog() {

	$('#tempDiv').dialog({
		modal : true,
		title : "Keyword Density",
		zIndex : 10000,
		autoOpen : true,
		width : '400',
		height : '400',
		resizable : false,
		buttons : {
			Ok : function() {
				$("#openError").html('');
				$(this).dialog('destroy');
			}
		},
		close : function(event, ui) {
			$("#openError").html('');
			$(this).dialog('destroy');
		}
	});
}
function paragraphcounter() {
	var my_data = $("#tData").val();

	if (my_data.trim().length > 0) {
		my_data = my_data.split("\n\n");
		var g = my_data.length;
		var i = 0;
		var strip_whitespace = '/\s+/gi';
		while (g >= 0) {
			g--;
			var tmp = my_data[g];
			tmp = tmp ? tmp.replace(strip_whitespace, "") : tmp;
			if (tmp && tmp.length > 1) {
				i++;
			}
		}
		$("#paragraph_count").val(i);
	}
}

function ChangeCase() {
	var txtcase = $("#caseSelect").val();
	// 0=as it is
	if (txtcase == 0) {
		$("#tData").val("");
		$("#tData").val(oldData);
	}
	// 1=uppercase
	else if (txtcase == 1) {
		$("#tData").val("");
		$("#tData").val(oldData.toUpperCase());
	}
	// 2=lowercase
	else if (txtcase == 2) {
		$("#tData").val("");
		$("#tData").val(oldData.toLowerCase());
	}
	// 3-propercase
	else if (txtcase == 3) {
		$("#tData").val("");
		$("#tData").val(oldData.toProperCase());
	}
	$("#tData").highlightTextarea('enable');
	$("#tData").highlightTextarea('setWords', highlightedText);
}
function countWord(para) {
	if (para != undefined) {
		paragraphFlag = para;
	}
	var data = $("#tData").val();
	if (data != null && data.trim().length > 0) {

		oldData = data;
		Countable.live(document.getElementById('tData'), function(counter) {

			$("#counter").text(
					counter.words + " words " + counter.all
							+ " characters(with space)");

			$("#character_count").val(counter.characters);
			$("#character_count_space").val(counter.all);
			$("#word_count").val(counter.words);
			var sentence = data.split(/[.?!](?=\s|\n)/).length;
			$("#sentence_count").val(sentence);
			$("#avg_sentence_length").val(Math.ceil(counter.words / sentence));
			$("#paragraph_count").val(counter.paragraphs);
		}, {
			hardReturns : paragraphFlag,
			stripTags : false
		});
		keywordDensity();
	} else {
		oldData = "";
		$("#character_count").val(0);
		$("#character_count_space").val(0);
		$("#word_count").val(0);
		$("#sentence_count").val(0);
		$("#avg_sentence_length").val(0);
		$("#paragraph_count").val(0);

		$("#keyword").html("");
		$("#tempDiv").html("");

		$("#counter").text(0 + " words " + 0 + " characters(with space)");
	}

}

function findWord() {

	var searchStr = $("#wordsearch").val();
	if (searchStr != null && searchStr.trim().length > 0) {

		var data = $("#tData").val();
		if (data != null && data.trim().length > 0) {
			highlightedText = data;
			$("#tData").highlightTextarea('enable');
			$("#tData").highlightTextarea('setWords', searchStr);
			data = data.toLowerCase();
			searchStr = searchStr.toLowerCase();
			var count = data.split(searchStr);

			$("#wordSearchcount").text(
					(count.length - 1) + "/" + $("#word_count").val());
		}
	} else {
		$("#wordSearchcount").text("");
		$("#tData").highlightTextarea('disable');
	}
}

function searchSelectedTextFromdialog(text) {

	$("#tempDiv").dialog('destroy');
	$("#wordsearch").val(text);
	$("#wordsearch").focus();

}

function getTotalWeights(arr) {
	var total = 0;
	$.each(arr, function() {
		total += this;
	});
	return total;
}
// Xpath-tester

function clearall() {
	$("#xmlString").val('');
	$("#xmlUrl").val('');
	$("#xpath").val('');
}
function xpath1() {

	$('html, body').animate({
		scrollTop : 0
	}, 1000);

	editorResult.setValue('');
	$('#hResult').hide();
	$('#closemsg').hide();

	var x = $("#xmlString").val();
	var pattrn = /:/g;
	var pattrn1 = /-/g;

	x = x.replace(pattrn, '-');
	var xml = $.parseXML(x);
	var path = $("#xpath").val();

	path = path.replace(pattrn, '-');
	var parent = path.split("/");
	var string = '';

	try {

		var names = xml.evaluate(path, xml, null, XPathResult.ANY_TYPE, null);

		if (names.resultType == 1) {
			string = parseFloat("" + names.numberValue).toFixed(1) + "\n";
		} else if (names.resultType == 2) {
			string = names.stringValue;

		} else {
			var namesArray = [];

			for (var name = names.iterateNext(); name != null; name = names
					.iterateNext()) {
				namesArray.push(name);
			}

			if (namesArray.length == 0) {
				string = "No Match!";
			} else {

				$(namesArray)
						.each(
								function(i, value) {
									if (value.nodeType == 9) {
										if (value.doctype == null) {
											string = "Document : No DOCTYPE Declaration, Root is [Element :<"
													+ value.documentElement.nodeName
													+ "/>]";
										} else {
											string = "Document : [DocType: <!DOCTYPE "
													+ value.doctype.nodeName
													+ ">], Root is [Element : <"
													+ value.documentElement.nodeName
													+ "/>]";
										}
									} else if (value.nodeType == 1) {
										if (path.indexOf('*') == 1) {
											string = value.outerHTML;
										} else {

											string += value.outerHTML + "\n";
											string = string.replace(pattrn1,
													':');
										}
									} else if (value.nodeType == 2) {
										string += value.nodeName + '="'
												+ value.nodeValue + '"' + "\n";
										string = string.replace(pattrn1, ':');
									} else if ((value.nodeType == 3)
											&& (value.nodeValue != null)) {

										string += "Text = " + value.nodeValue
												+ "\n";
									}

									else if ((value.nodeType == 3)
											&& (value.nodeValue == null)) {
										string = "NO MATCH!";
									}

								});
			}
		}
		setOutputMsg("Generated XPath");
		editorResult.setValue(string);
	} catch (e) {
		var errMessage = e.message.split(":");
		$('#closemsg').show();
		$('#hResult').show();
		$('#hResult').html(e.name + ":" + errMessage[1]);
	}
}
// yaml-to-json-xml-csv
function validateYaml() {
	editorResult.getSession().setMode("ace/mode/json");
	var oldformat = editorAce.getValue();
	if (oldformat.trim().length > 0) {
		try {

			data = YAML.parse(oldformat);

			setOutputMsg("YAML Valid");
			converted = "validate";
			editorResult.setValue("YAML IS VALID");
		} catch (e) {
			var errorData = "";

			errorData = errorData + "Error : " + e['message'];
			errorData = errorData + "\n";
			errorData = errorData + "Line : " + e['parsedLine'] + "  "
					+ e['snippet'];

			editorResult.setValue(errorData);
			setOutputMsg("Invalid YAML");
		}
	}
}

function yamlToJson() {
	editorResult.getSession().setMode("ace/mode/json");
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		try {

			data = YAML.parse(oldformat.trim());

			// json = JSON.stringify(data, null, " ");
			converted = "json";
			editorResult.setValue(vkbeautify.json(data));

			setOutputMsg("YAML TO JSON");
		} catch (e) {
			var errorData = "";

			errorData = errorData + "Error : " + e['message'];
			errorData = errorData + "\n";
			errorData = errorData + "Line : " + e['parsedLine'] + "  "
					+ e['snippet'];

			editorResult.setValue(errorData);
			setOutputMsg("Invalid YAML");
		}
	}
}

function yamlToxml() {
	editorResult.getSession().setMode("ace/mode/xml");
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		try {

			data = YAML.parse(oldformat.trim());
			var xotree = new XML.ObjTree();
			var xml = xotree.writeXML(data);
			xml = decodeSpecialCharacter(xml);

			var isvalidXML;
			try {
				isvalidXML = $.parseXML(xml);
			} catch (e) {
				isvalidXML = false;

			}

			if (isvalidXML == false) {
				xml = xml.substr(0, 39) + "<root>" + xml.substr(39) + "</root>";
			}

			editorResult.setValue(vkbeautify.xml(xml));
			converted = "xml";
			setOutputMsg("YAML TO XML");
		} catch (e) {
			var errorData = "";

			errorData = errorData + "Error : " + e['message'];
			errorData = errorData + "\n";
			errorData = errorData + "Line : " + e['parsedLine'] + "  "
					+ e['snippet'];

			editorResult.setValue(errorData);
			setOutputMsg("Invalid YAML");
		}
	}
}

function yamlTocsv() {
	var oldformat = editorAce.getValue();

	if (oldformat.trim().length > 0) {
		data = YAML.parse(oldformat);
		var xotree = new XML.ObjTree();
		var xml = xotree.writeXML(data);
		xml = decodeSpecialCharacter(xml);

		var isvalidXML;
		try {
			isvalidXML = $.parseXML(xml);
		} catch (e) {
			isvalidXML = false;

		}

		if (isvalidXML == false) {
			xml = xml.substr(0, 39) + "<root>" + xml.substr(39) + "</root>";
		}

		$.ajax({
			type : "post",
			url : globalurl + "convter",
			data : {
				type : 'xml2csv',
				data : xml
			},
			success : function(response) {
				editorResult.getSession().setMode("ace/mode/text");
				editorResult.setValue(response);
				converted = "csv";
				setOutputMsg("YAML TO CSV");

			},
			error : function(e) {
				openErrorDialog("Failed to Convert into CSV");
			}
		});
	}
}


// yaml validator
function YAMLValidator() {
	var data = editorAce.getValue();
	if (data != null && data.trim().length != 0) {
		try {
			data = YAML.parse(data);

			$("#hResult").show();
			$("#hResult").removeClass();
			$("#hResult").addClass("success");
			$("#editor").css({
				'border' : '1px solid #C6D880'
			});
			$("#hResult").text("Valid YAML");
		} catch (e) {

			var errorData = "";

			errorData = errorData + "Error : " + e['message'];
			errorData = errorData + "\n";
			errorData = errorData + "Line : " + e['parsedLine'] + "  "
					+ e['snippet'];

			$("#hResult").show();
			$("#editor").css({
				'border' : '1px solid #FBC2C4'
			});
			$("#hResult").removeClass();
			$("#hResult").addClass("error");
			$("#hResult").text(errorData);
		}
	} else {
		$("#editor").css({
			'border' : '1px solid #BCBDBA'
		});
		$("#hResult").hide();
	}
}

function clearYAML() {
	editorAce.setValue("");
	$("#hResult").hide();
}
// send snap message
function loadPopup() {
	if (popupStatus == 0) { // if value is 0, show popup
		// closeloading(); // fadeout loading
		$(".openPhotoDiv").fadeIn(0500); // fadein popup div
		$("#backgroundPopup").css("opacity", "0.7"); // css opacity, supports
		// IE7, IE8
		$("#backgroundPopup").fadeIn(0001);
		popupStatus = 1; // and set value to 1
	}
}

function disablePopup() {
	if (popupStatus == 1) { // if value is 1, close popup
		$(".openPhotoDiv").fadeOut("normal");
		$("#backgroundPopup").fadeOut("normal");
		popupStatus = 0; // and set value to 0
	}
}
// ipcheck
function time1() {
	var d = new Date();
	var n = d.toString();

	$('#timer123').html("<b>Time:</b> " + n.replace(/GMT.*/g, ""));
}
function whether(city) {
	$('.weather-temperature').openWeather({
		city : city,
		descriptionTarget : '.weather-description',
		windSpeedTarget : '.weather-wind-speed',
		minTemperatureTarget : '.weather-min-temperature',
		maxTemperatureTarget : '.weather-max-temperature',
		humidityTarget : '.weather-humidity',
		sunriseTarget : '.weather-sunrise',
		sunsetTarget : '.weather-sunset',
		placeTarget : '.weather-place',
		iconTarget : '.weather-icon',
		customIcons : '/img/icons/weather/',
		success : function() {

			// show weather

			$('.weather-wrapper').show();
			$("#spinner2").remove();
		},
	});
}
function LoadNewsBar(cityname) {

	var newsBar;
	var city = new Array(cityname);
	var options = {
		largeResultSet : true,
		autoExecuteList : {
			executeList : city
		}
	}

	newsBar = new GSnewsBar(document.getElementById("newsBar-bar"), options);

	setInterval(function() {
		var parent = document.getElementById("newsBar-bar");
		var links = document.getElementsByTagName("a");
		for (var i = 0; i < links.length; i++) {
			$(".gs-title").attr("target", "_blank");
			// links[i].setAttribute("target", "_blank");

		}
	}, 300);
}
var strip, strcountry, strcity, strregion, strlatitude, strlongitude, strtimezone;
function GetUserInfo(data) {
	strip = data.ip;
	strcountry = data.country;
	strcity = data.city;
	strregion = data.region;
	strlatitude = data.latitude;
	strlongitude = data.longitude;
	strtimezone = data.timezone;
}

function BindUserInfo() {

	$("#ip").html("<b>Your IP : </b>" + strip);
	$("#Country").html("<b>Country Name</b>: " + strcountry);

	$("#city").html("<b>City</b>: " + strcity);
	$("#newsfeedtext").text("Latest News | " + strcity);

	$("#currencyCode").html("<b>CurrencyCode</b>: " + strcity);

	$("#spinner1").remove();
	$("#weatherinformation").text(strcity + "  |  Weather ");

	whether(strcity);
	LoadNewsBar(strcity);
}

function tweet(img) {
	$.ajax({
		url : "/service/postTextToTwitter",
		type : "post",
		data : {
			tweet : $("#tweet").val(),
			imgflag : img,
			img_data : canvas.toDataURL()
		}
	}).done(function(resposne) {
		if (resposne == "success") {
			$("#tweet").val("");
			openErrorDialog("Hurrey,Your Big Tweet Successfully Done");
		} else {
			openErrorDialog("Sorry There is some problem Please Try Again.");
		}
	});
}

function TwitterLogin() {
	$("#tweetLogin").dialog({
		modal : true,
		title : "Login",
		zIndex : 10000,
		autoOpen : true,
		width : '400',
		resizable : false,
	});
}

function createImageFromText($this) {
	context.font = "15px sans-serif";
	var data = $($this).val();

	data = data.match(/.{1,65}/g);

	context.clearRect(0, 0, canvas.width, canvas.height);
	
	if (data.length != 0) {
		for (var i = 0; i < data.length; i++) {
			context.fillText(data[i],0, 20 + (15 * i));
		}		 
	}
}

var PIXEL_RATIO = (function () {
    var ctx = document.createElement("canvas").getContext("2d"),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx.webkitBackingStorePixelRatio ||
              ctx.mozBackingStorePixelRatio ||
              ctx.msBackingStorePixelRatio ||
              ctx.oBackingStorePixelRatio ||
              ctx.backingStorePixelRatio || 1;

    return dpr / bsr;
})();


createHiDPICanvas = function(w, h, ratio) {
    if (!ratio) { ratio = PIXEL_RATIO; }
    var can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";
    can.id = "canvas";
    can.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return can;
};
