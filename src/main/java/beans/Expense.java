package beans;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Expense {
	private int requestId;
	private String requestday;
    private String update;
	private String name;
	private String title;
	private String amount;
	private String status;
	public int getRequestId() {
		return requestId;
	}
	public void setRequestId(int requestId) {
		this.requestId = requestId;
	}
	public String getRequestday() {
		return requestday;
	}
	public void setRequestday(String requestday) {
		this.requestday = requestday;
	}
	public String getUpdate() {
		return update;
	}
	public void setUpdate(String update) {
		this.update = update;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}




}
