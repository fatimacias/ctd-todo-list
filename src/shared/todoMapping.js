export function mapRecordsToTodos(records = []) {
  return records.map((record) => {
    const fields = record.fields ?? {};
    return {
      id: record.id,
      title: fields.title ?? "",
      isCompleted: !!fields.isCompleted,
    };
  });
}

export function toCreatePayload(title) {
  return {
    records: [
      {
        fields: {
          title: title,
          isCompleted: false,
        },
      },
    ],
  };
}

export function toUpdatePayload(todo) {
  return {
    records: [
      {
        id: todo.id,
        fields: {
          title: todo.title,
          isCompleted: !!todo.isCompleted,
        },
      },
    ],
  };
}

export function toCompletePayload(id) {
  return {
    records: [
      {
        id: id,
        fields: {
          isCompleted: true,
        },
      },
    ],
  };
}