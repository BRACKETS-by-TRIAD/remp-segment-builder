<template>
  <div>
    <span>{{ parameter.id }}</span>
    <ParameterSelect :parameterId="parameter.id" />

    <BooleanParameter />

    <ParameterDelete :parameterId="parameter.id" />
  </div>

</template>

<script>
import ParameterSelect from './ParameterSelect';
import BooleanParameter from './ParameterTypes/BooleanParameter';
import ParameterDelete from './ParameterDelete';

export default {
  name: 'ParameterRow',
  props: ['parameter'],
  components: { ParameterDelete, ParameterSelect, BooleanParameter }
};
</script>
