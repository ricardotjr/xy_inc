package br.com.ricardo.controller.util;

import java.util.ArrayList;
import java.util.List;

public class ResponseMessage {

	private static final String SUCCESS = "success";
	private static final String ERROR = "error";
	private String result;
	private List<String> messages;

	private ResponseMessage(String success, String message) {

		this.result = success;
		this.messages = new ArrayList<String>();
		this.messages.add(message);
	}

	private ResponseMessage(String success, List<String> messages) {

		this.result = success;
		this.messages = messages;
	}

	public static ResponseMessage success() {

		return new ResponseMessage(SUCCESS, SUCCESS);
	}

	public static ResponseMessage error() {

		return new ResponseMessage(ERROR, ERROR);
	}

	public static ResponseMessage succesMessage(String message) {

		return new ResponseMessage(SUCCESS, message);
	}

	public static ResponseMessage errorMessage(String message) {

		return new ResponseMessage(ERROR, message);
	}

	public static ResponseMessage errorMessage(List<String> message) {

		return new ResponseMessage(ERROR, message);
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public List<String> getMessages() {
		return messages;
	}

	public void setMessages(List<String> messages) {
		this.messages = messages;
	}
}
