<template>
  <div>
    <span>{{ parameter.id }}</span>
    <ParameterSelect :parameterId="parameter.id" />

    <BooleanParameter />
    <StringParameter />
    <NumberParameter />
    <DatetimeParameter />

    <ParameterDelete :parameterId="parameter.id" />
  </div>

</template>

<script>
import ParameterSelect from './ParameterSelect';
import BooleanParameter from './ParameterTypes/BooleanParameter';
import StringParameter from './ParameterTypes/StringParameter';
import NumberParameter from './ParameterTypes/NumberParameter';
import DatetimeParameter from './ParameterTypes/DatetimeParameter';
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter'],
  components: {
    ParameterSelect,
    BooleanParameter,
    StringParameter,
    NumberParameter,
    DatetimeParameter,
    ParameterDelete
  }
};
</script>
