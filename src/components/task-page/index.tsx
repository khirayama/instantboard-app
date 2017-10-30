import * as PropTypes from 'prop-types';
import * as React from 'react';
import Icon from '../../components/icon';
import Indicator from '../../components/indicator';
import Link from '../../router/link';
import queryString from '../../utils/query-string';

export default class TaskPage extends React.Component<any, any> {
  public static contextTypes = {
    move: PropTypes.func,
  };

  private handleChangeLabelIdSelect: any;

  private handleChangeContentTextarea: any;

  private handleKeyDownContentTextarea: any;

  private handleSubmit: any;

  constructor(props: any) {
    super(props);

    this.state = {
      taskId: (props.params.id) ? Number(props.params.id) : null,
      content: '',
      labelId: null,
      uiBlocking: false,
    };

    this.handleChangeLabelIdSelect = this._handleChangeLabelIdSelect.bind(this);
    this.handleChangeContentTextarea = this._handleChangeContentTextarea.bind(this);
    this.handleKeyDownContentTextarea = this._handleKeyDownContentTextarea.bind(this);
    this.handleSubmit = this._handleSubmit.bind(this);
  }

  public componentDidMount() {
    this.props.actions.fetchLabel();
    this.props.actions.fetchTask();
  }

  public componentDidUpdate(prevProps) {
    const ui = this.props.ui;
    const prevUi = prevProps.ui;
    const tasks = this.props.tasks;
    const labels = this.props.labels;

    let selectedLabelId: number|null = null;
    if (typeof window === 'object') {
      const query = queryString.parse(window.location.search);
      if (query['label-id']) {
        selectedLabelId = Number(query['label-id']);
      }
    }

    if (prevUi.isLoadingLabels && !ui.isLoadingLabels && labels.length !== 0) {
      let labelId = labels[0].id;
      for (const label of labels) {
        if (label.id === selectedLabelId) {
          labelId = label.id;
          break;
        }
      }
      this.setState({labelId});
    }

    if (prevUi.isLoadingTasks && !ui.isLoadingTasks && tasks.length !== 0 && this.state.taskId) {
      for (const task of tasks) {
        if (task.id === this.state.taskId) {
          this.setState({content: task.content});
          break;
        }
      }
    }
  }

  public render() {
    const ui = this.props.ui;
    const labels = this.props.labels;

    return (
      <section className="page task-page">
        {(this.state.uiBlocking) ? <div className="ui-block" /> : null}
        <Indicator active={(ui.isLoadingTasks)}/>
        <form onSubmit={this.handleSubmit}>
          <header className="task-page--header">
            <Link to="/"><Icon type="back"/></Link>
            <button><Icon type="send"/></button>
          </header>
          <div className="task-page--label-block">
            <Link to="/labels"><Icon type="label"/></Link>
            {(this.state.labelId) ? (
              <select value={this.state.labelId} onChange={this.handleChangeLabelIdSelect}>
                {labels.map((label: any) => <option key={label.id} value={label.id}>{label.name}</option>)}
              </select>
            ) : null}
          </div>
          <div>
            <textarea
              className="task-page--task-content-textarea"
              autoFocus
              rows={16}
              value={this.state.content}
              onChange={this.handleChangeContentTextarea}
              onKeyDown={this.handleKeyDownContentTextarea}
              placeholder="Enter task text"
            />
          </div>
        </form>
      </section>
    );
  }

  private _handleChangeLabelIdSelect(event: any) {
    this.setState({labelId: event.currentTarget.value});
  }

  private _handleChangeContentTextarea(event: any) {
    this.setState({content: event.currentTarget.value});
  }

  private _handleKeyDownContentTextarea(event: any) {
    const ENTER_KEY_CODE = 13;

    if (event.keyCode === ENTER_KEY_CODE) {
      event.preventDefault();
      this.submitTask();
    }
  }

  private _handleSubmit(event: any) {
    event.preventDefault();
    this.submitTask();
  }

  private submitTask() {
    const content = this.state.content.trim();
    const id = this.props.params.id;

    if (content && !this.state.uiBlocking) {
      this.setState({uiBlocking: true});

      if (id === undefined || id === null) {
        this.props.actions.createTask({
          content,
          labelId: this.state.labelId,
        }).then(() => {
          this.context.move('/');
        });
      } else {
        this.props.actions.updateTask({
          id,
          content,
          labelId: this.state.labelId,
        }).then(() => {
          this.context.move('/');
        });
      }
    }
  }
}
